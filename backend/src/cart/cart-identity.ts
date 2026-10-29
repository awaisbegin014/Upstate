import type { CookieOptions } from 'express';
import type { PrismaService } from '../prisma/prisma.service.js';

/** httpOnly cookie that identifies a signed-out visitor's cart. */
export const GUEST_CART_COOKIE = 'ue_cart';

export function guestCartCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
}

/**
 * Moves a guest cart's lines into the user's cart (quantities add up), then
 * deletes the guest cart. Called after sign-in and registration.
 */
export async function mergeGuestCart(
  prisma: PrismaService,
  guestToken: string | undefined,
  userId: string,
): Promise<void> {
  if (!guestToken) return;
  const guest = await prisma.cart.findUnique({
    where: { guestToken },
    include: { items: true },
  });
  if (!guest) return;

  await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    for (const item of guest.items) {
      await tx.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
        create: { cartId: cart.id, productId: item.productId, quantity: item.quantity },
        update: { quantity: { increment: item.quantity } },
      });
    }
    await tx.cart.delete({ where: { id: guest.id } });
  });
}
