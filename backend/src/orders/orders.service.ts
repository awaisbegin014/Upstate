import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import type Stripe from 'stripe';
import { CartService } from '../cart/cart.service.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { computeTotals } from '../common/utils/money.js';
import { pageResult, paginate } from '../common/utils/pagination.js';
import type { Order, Prisma } from '../generated/prisma/client.js';
import { StripeService } from '../payments/stripe.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { SettingsService } from '../settings/settings.service.js';
import type {
  AdminOrderQuery,
  AdminUpdateOrderDto,
  CheckoutDto,
} from './dto/orders.dto.js';

/** Card checkout sessions stay open this long before stock is released. */
const PAYMENT_WINDOW_MS = 60 * 60 * 1000;
const ORDER_NUMBER_START = 100_001;

const orderInclude = {
  items: { orderBy: { name: 'asc' } },
} satisfies Prisma.OrderInclude;

@Injectable()
export class OrdersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersService.name);
  private sweepTimer: NodeJS.Timeout | undefined;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cart: CartService,
    private readonly settings: SettingsService,
    private readonly stripe: StripeService,
  ) {}

  onModuleInit() {
    // Releases stock held by card checkouts that were abandoned, in case the
    // Stripe webhook is not configured (e.g. local development).
    this.sweepTimer = setInterval(() => void this.sweepStalePayments(), 10 * 60 * 1000);
    this.sweepTimer.unref();
  }

  onModuleDestroy() {
    clearInterval(this.sweepTimer);
  }

  // ---------------------------------------------------------------- checkout

  async checkout(user: AuthUser, dto: CheckoutDto) {
    const settings = await this.settings.get();
    if (dto.fulfillment === 'PICKUP' && !settings.pickupEnabled) {
      throw new BadRequestException('Local pickup is not available right now.');
    }
    if (dto.paymentMethod === 'INVOICE' && !settings.invoiceEnabled) {
      throw new BadRequestException('Pay on invoice is not available right now.');
    }
    if (dto.paymentMethod === 'CARD' && !this.stripe.configured) {
      throw new BadRequestException('Card payments are not available right now.');
    }

    const cart = await this.cart.view({ userId: user.id });
    if (!cart.lines.length) throw new BadRequestException('Your cart is empty.');
    const problem = cart.lines.find((l) => l.issue);
    if (problem) {
      throw new BadRequestException(
        `Please review your cart: ${problem.product.name} — ${problem.issue}.`,
      );
    }

    const totals = computeTotals(cart.subtotalCents, settings, dto.fulfillment);
    const isCard = dto.paymentMethod === 'CARD';
    const shipping = dto.fulfillment === 'SHIPPING';

    const order = await this.prisma.$transaction(async (tx) => {
      // Reserve stock; the conditional update fails if someone else got there first.
      for (const line of cart.lines) {
        const { count } = await tx.product.updateMany({
          where: { id: line.product.id, isActive: true, stock: { gte: line.quantity } },
          data: { stock: { decrement: line.quantity } },
        });
        if (count === 0) {
          throw new ConflictException(
            `${line.product.name} just sold out or changed. Please review your cart.`,
          );
        }
      }

      const counter = await tx.counter.upsert({
        where: { id: 'order' },
        create: { id: 'order', value: ORDER_NUMBER_START },
        update: { value: { increment: 1 } },
      });

      const created = await tx.order.create({
        data: {
          number: `UE-${counter.value}`,
          userId: user.id,
          status: isCard ? 'PENDING_PAYMENT' : 'PLACED',
          paymentMethod: dto.paymentMethod,
          fulfillment: dto.fulfillment,
          email: dto.email || user.email,
          phone: dto.phone,
          contactName: dto.contactName,
          company: dto.company || null,
          poNumber: dto.poNumber || null,
          notes: dto.notes || null,
          shipLine1: shipping ? dto.shipLine1 : null,
          shipLine2: shipping ? dto.shipLine2 || null : null,
          shipCity: shipping ? dto.shipCity : null,
          shipState: shipping ? dto.shipState : null,
          shipPostalCode: shipping ? dto.shipPostalCode : null,
          ...totals,
          items: {
            create: cart.lines.map((l) => ({
              productId: l.product.id,
              name: l.product.name,
              sku: l.product.sku,
              imageUrl: l.product.image?.url ?? null,
              unitPriceCents: l.product.priceCents,
              quantity: l.quantity,
              lineTotalCents: l.lineTotalCents,
            })),
          },
        },
        include: orderInclude,
      });

      await tx.cartItem.deleteMany({ where: { cart: { userId: user.id } } });
      return created;
    });

    if (!isCard) return { order, checkoutUrl: null };

    const storeUrl = (process.env.STORE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
    try {
      const session = await this.stripe.createCheckoutSession({
        orderId: order.id,
        orderNumber: order.number,
        email: order.email,
        lines: order.items.map((i) => ({
          name: i.name,
          unitPriceCents: i.unitPriceCents,
          quantity: i.quantity,
        })),
        shippingCents: order.shippingCents,
        taxCents: order.taxCents,
        successUrl: `${storeUrl}/checkout/success?order=${order.number}&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${storeUrl}/checkout/cancelled?order=${order.number}`,
        expiresAt: new Date(Date.now() + PAYMENT_WINDOW_MS),
      });
      const updated = await this.prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
        include: orderInclude,
      });
      return { order: updated, checkoutUrl: session.url };
    } catch (e) {
      // Give the stock and the cart back so the customer can try again.
      await this.cancel(order.id);
      await this.restoreCart(user.id, order.id);
      throw e;
    }
  }

  // --------------------------------------------------------------- customer

  listForUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: { select: { id: true, name: true, quantity: true, imageUrl: true } } },
    });
  }

  async getForUser(user: AuthUser, number: string) {
    let order = await this.prisma.order.findUnique({
      where: { number },
      include: orderInclude,
    });
    if (!order || (order.userId !== user.id && user.role !== 'ADMIN')) {
      throw new NotFoundException('Order not found.');
    }
    // The success page may load before the webhook lands; ask Stripe directly.
    if (order.status === 'PENDING_PAYMENT' && order.stripeSessionId) {
      await this.syncStripe(order);
      order = await this.prisma.order.findUniqueOrThrow({
        where: { id: order.id },
        include: orderInclude,
      });
    }
    return order;
  }

  /** Customer backed out of Stripe: cancel the pending order and refill their cart. */
  async abandonPayment(user: AuthUser, number: string) {
    const order = await this.prisma.order.findUnique({ where: { number } });
    if (!order || order.userId !== user.id) throw new NotFoundException('Order not found.');
    if (order.status !== 'PENDING_PAYMENT') return { restored: false };
    if (order.stripeSessionId) {
      await this.syncStripe(order);
      const fresh = await this.prisma.order.findUniqueOrThrow({ where: { id: order.id } });
      if (fresh.status !== 'PENDING_PAYMENT') return { restored: false };
      await this.stripe.expireSession(order.stripeSessionId);
    }
    await this.cancel(order.id);
    await this.restoreCart(user.id, order.id);
    return { restored: true };
  }

  // ----------------------------------------------------------------- stripe

  async handleStripeEvent(event: Stripe.Event) {
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object;
      if (session.payment_status === 'paid') await this.markPaidFromSession(session);
    } else if (event.type === 'checkout.session.expired') {
      const order = await this.prisma.order.findUnique({
        where: { stripeSessionId: event.data.object.id },
      });
      if (order?.status === 'PENDING_PAYMENT') await this.cancel(order.id);
    }
  }

  private async syncStripe(order: Order) {
    if (!order.stripeSessionId || !this.stripe.configured) return;
    try {
      const session = await this.stripe.getSession(order.stripeSessionId);
      if (session.payment_status === 'paid') {
        await this.markPaidFromSession(session);
      } else if (session.status === 'expired') {
        await this.cancel(order.id);
      }
    } catch (e) {
      this.logger.warn(`Could not sync ${order.number} with Stripe: ${(e as Error).message}`);
    }
  }

  private async markPaidFromSession(session: Stripe.Checkout.Session) {
    const paymentIntent =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
    // Idempotent: only a still-pending order moves to PLACED.
    const { count } = await this.prisma.order.updateMany({
      where: { stripeSessionId: session.id, status: 'PENDING_PAYMENT' },
      data: {
        status: 'PLACED',
        paymentStatus: 'PAID',
        paidAt: new Date(),
        stripePaymentIntentId: paymentIntent,
      },
    });
    if (count === 0) {
      const order = await this.prisma.order.findUnique({
        where: { stripeSessionId: session.id },
      });
      if (order?.status === 'CANCELLED' && order.paymentStatus !== 'PAID') {
        // Paid after we released the stock. Record it so staff can follow up.
        await this.prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'PAID',
            paidAt: new Date(),
            stripePaymentIntentId: paymentIntent,
            adminNote: [order.adminNote, 'Payment arrived after this order was cancelled — refund or reinstate.']
              .filter(Boolean)
              .join('\n'),
          },
        });
      }
    }
  }

  private async sweepStalePayments() {
    const stale = await this.prisma.order.findMany({
      where: {
        status: 'PENDING_PAYMENT',
        createdAt: { lt: new Date(Date.now() - PAYMENT_WINDOW_MS - 5 * 60 * 1000) },
      },
    });
    for (const order of stale) {
      if (order.stripeSessionId && this.stripe.configured) await this.syncStripe(order);
      else await this.cancel(order.id);
    }
  }

  // ------------------------------------------------------------------ admin

  async adminList(q: AdminOrderQuery) {
    const { page, pageSize, skip, take } = paginate(q, 20);
    const term = q.q?.trim();
    const where: Prisma.OrderWhereInput = {
      ...(q.status ? { status: q.status } : {}),
      ...(term
        ? {
            OR: [
              { number: { contains: term } },
              { email: { contains: term } },
              { contactName: { contains: term } },
              { company: { contains: term } },
              { poNumber: { contains: term } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: { _count: { select: { items: true } } },
      }),
      this.prisma.order.count({ where }),
    ]);
    return pageResult(items, total, page, pageSize);
  }

  async adminGet(number: string) {
    const order = await this.prisma.order.findUnique({
      where: { number },
      include: {
        ...orderInclude,
        user: { select: { id: true, email: true, firstName: true, lastName: true, company: true } },
      },
    });
    if (!order) throw new NotFoundException('Order not found.');
    return order;
  }

  async adminUpdate(number: string, dto: AdminUpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { number } });
    if (!order) throw new NotFoundException('Order not found.');

    if (dto.status && dto.status !== order.status) {
      if (order.status === 'CANCELLED') {
        throw new BadRequestException('A cancelled order cannot be reopened. Create a new order instead.');
      }
      if (dto.status === 'PENDING_PAYMENT') {
        throw new BadRequestException('Orders cannot be moved back to "awaiting payment".');
      }
      if (dto.status === 'CANCELLED') await this.cancel(order.id);
    }

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        ...(dto.status && dto.status !== 'CANCELLED' ? { status: dto.status } : {}),
        ...(dto.paymentStatus
          ? {
              paymentStatus: dto.paymentStatus,
              ...(dto.paymentStatus === 'PAID' && !order.paidAt ? { paidAt: new Date() } : {}),
            }
          : {}),
        ...(dto.adminNote !== undefined ? { adminNote: dto.adminNote || null } : {}),
      },
    });
    return this.adminGet(number);
  }

  // ---------------------------------------------------------------- helpers

  /** Cancels an order and puts its stock back. Safe to call twice. */
  private async cancel(orderId: string) {
    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.order.updateMany({
        where: { id: orderId, status: { not: 'CANCELLED' } },
        data: { status: 'CANCELLED' },
      });
      if (count === 0) return;
      const items = await tx.orderItem.findMany({ where: { orderId } });
      for (const item of items) {
        if (!item.productId) continue;
        await tx.product.updateMany({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    });
  }

  /** Puts a cancelled order's lines back in the customer's cart. */
  private async restoreCart(userId: string, orderId: string) {
    const items = await this.prisma.orderItem.findMany({ where: { orderId } });
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    for (const item of items) {
      if (!item.productId) continue;
      await this.prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
        create: { cartId: cart.id, productId: item.productId, quantity: item.quantity },
        update: { quantity: item.quantity },
      });
    }
  }
}
