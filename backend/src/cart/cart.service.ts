import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { computeTotals } from '../common/utils/money.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SettingsService } from '../settings/settings.service.js';
import { MAX_LINE_QTY } from './dto/cart.dto.js';

/** Who the cart belongs to: a signed-in user or a guest cookie (possibly not issued yet). */
export type CartOwner = { userId: string } | { guestToken: string | undefined };

const lineInclude = {
  product: {
    select: {
      id: true,
      slug: true,
      sku: true,
      name: true,
      priceCents: true,
      stock: true,
      isActive: true,
      isQuoteOnly: true,
      leadTime: true,
      images: { orderBy: { sortOrder: 'asc' as const }, take: 1, select: { url: true, alt: true } },
      category: { select: { slug: true, name: true, icon: true } },
      brand: { select: { name: true } },
    },
  },
};

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
  ) {}

  private findCart(owner: CartOwner) {
    if ('userId' in owner) {
      return this.prisma.cart.findUnique({ where: { userId: owner.userId } });
    }
    return owner.guestToken
      ? this.prisma.cart.findUnique({ where: { guestToken: owner.guestToken } })
      : Promise.resolve(null);
  }

  /** Finds or creates the cart. Returns a new guest token when one had to be issued. */
  private async ensureCart(owner: CartOwner) {
    if ('userId' in owner) {
      const cart = await this.prisma.cart.upsert({
        where: { userId: owner.userId },
        create: { userId: owner.userId },
        update: {},
      });
      return { cart, issuedToken: undefined };
    }
    const existing = await this.findCart(owner);
    if (existing) return { cart: existing, issuedToken: undefined };
    const guestToken = randomBytes(24).toString('base64url');
    const cart = await this.prisma.cart.create({ data: { guestToken } });
    return { cart, issuedToken: guestToken };
  }

  /** The cart with per-line availability and totals for both fulfillment options. */
  async view(owner: CartOwner) {
    const cart = await this.findCart(owner);
    const items = cart
      ? await this.prisma.cartItem.findMany({
          where: { cartId: cart.id },
          include: lineInclude,
          orderBy: { createdAt: 'asc' },
        })
      : [];

    const lines = items.map((item) => {
      const p = item.product;
      let issue: string | null = null;
      if (!p.isActive) issue = 'No longer available';
      else if (p.isQuoteOnly) issue = 'Quote-only item — request a quote instead';
      else if (p.stock <= 0) issue = 'Out of stock';
      else if (item.quantity > p.stock) issue = `Only ${p.stock} in stock`;
      const { images, ...product } = p;
      return {
        id: item.id,
        quantity: item.quantity,
        product: { ...product, image: images[0] ?? null },
        lineTotalCents: p.priceCents * item.quantity,
        issue,
      };
    });

    const subtotalCents = lines
      .filter((l) => !l.issue)
      .reduce((sum, l) => sum + l.lineTotalCents, 0);
    const settings = await this.settings.get();
    return {
      id: cart?.id ?? null,
      lines,
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      hasIssues: lines.some((l) => l.issue),
      subtotalCents,
      totals: {
        SHIPPING: computeTotals(subtotalCents, settings, 'SHIPPING'),
        PICKUP: computeTotals(subtotalCents, settings, 'PICKUP'),
      },
    };
  }

  async add(owner: CartOwner, productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) {
      throw new NotFoundException('This product is no longer available.');
    }
    if (product.isQuoteOnly) {
      throw new BadRequestException('This item is priced per job. Please request a quote.');
    }
    if (product.stock <= 0) {
      throw new BadRequestException('Sorry, this item is out of stock.');
    }

    const { cart, issuedToken } = await this.ensureCart(owner);
    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    const wanted = (existing?.quantity ?? 0) + quantity;
    const capped = Math.min(wanted, product.stock, MAX_LINE_QTY);
    await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity: capped },
      update: { quantity: capped },
    });
    const view = await this.view('userId' in owner ? owner : { guestToken: cart.guestToken ?? undefined });
    return {
      cart: view,
      issuedToken,
      notice: capped < wanted ? `Only ${product.stock} available — quantity adjusted.` : null,
    };
  }

  async update(owner: CartOwner, itemId: string, quantity: number) {
    const item = await this.ownItem(owner, itemId);
    const capped = Math.max(1, Math.min(quantity, item.product.stock || quantity, MAX_LINE_QTY));
    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity: capped } });
    return this.view(owner);
  }

  async remove(owner: CartOwner, itemId: string) {
    await this.ownItem(owner, itemId);
    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.view(owner);
  }

  async clear(owner: CartOwner) {
    const cart = await this.findCart(owner);
    if (cart) await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.view(owner);
  }

  private async ownItem(owner: CartOwner, itemId: string) {
    const cart = await this.findCart(owner);
    const item = cart
      ? await this.prisma.cartItem.findFirst({
          where: { id: itemId, cartId: cart.id },
          include: { product: { select: { stock: true } } },
        })
      : null;
    if (!item) throw new NotFoundException('That item is not in your cart.');
    return item;
  }
}
