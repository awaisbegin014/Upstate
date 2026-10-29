import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import Stripe from 'stripe';

export interface CheckoutLine {
  name: string;
  unitPriceCents: number;
  quantity: number;
}

export interface CheckoutSessionInput {
  orderId: string;
  /** Human order number, e.g. "UE-100123". */
  orderNumber: string;
  email: string;
  lines: CheckoutLine[];
  shippingCents: number;
  taxCents: number;
  successUrl: string;
  cancelUrl: string;
  expiresAt: Date;
}

/** Thin wrapper around the Stripe SDK so the rest of the API never touches it directly. */
@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private client: Stripe | null = null;

  /** True once STRIPE_SECRET_KEY is set. Card checkout is hidden without it. */
  get configured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY);
  }

  private get stripe(): Stripe {
    if (!this.configured) {
      throw new ServiceUnavailableException(
        'Online card payments are not available right now. Please choose "Pay on invoice" or call us.',
      );
    }
    this.client ??= new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      maxNetworkRetries: 2,
      timeout: 20_000,
    });
    return this.client;
  }

  async createCheckoutSession(input: CheckoutSessionInput) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      input.lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: l.unitPriceCents,
          product_data: { name: l.name },
        },
      }));
    if (input.shippingCents > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: input.shippingCents,
          product_data: { name: 'Shipping' },
        },
      });
    }
    if (input.taxCents > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: input.taxCents,
          product_data: { name: 'Sales tax' },
        },
      });
    }

    const metadata = { orderId: input.orderId, orderNumber: input.orderNumber };
    try {
      const session = await this.stripe.checkout.sessions.create(
        {
          mode: 'payment',
          client_reference_id: input.orderId,
          customer_email: input.email,
          locale: 'en',
          line_items,
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          expires_at: Math.floor(input.expiresAt.getTime() / 1000),
          metadata,
          payment_intent_data: {
            metadata,
            description: `Upstate Equipment order ${input.orderNumber}`,
          },
        },
        { idempotencyKey: `checkout-${input.orderId}` },
      );
      if (!session.url) throw new Error('Stripe returned no checkout URL');
      return { id: session.id, url: session.url };
    } catch (e) {
      this.logger.error(
        `Could not create a checkout session for ${input.orderNumber}: ${(e as Error).message}`,
      );
      if (e instanceof ServiceUnavailableException) throw e;
      throw new BadGatewayException(
        'We could not start the card payment. Please try again in a moment.',
      );
    }
  }

  getSession(id: string) {
    return this.stripe.checkout.sessions.retrieve(id);
  }

  async expireSession(id: string): Promise<void> {
    try {
      await this.stripe.checkout.sessions.expire(id);
    } catch (e) {
      // Already complete or expired: nothing to do.
      this.logger.debug(`Session ${id} could not be expired: ${(e as Error).message}`);
    }
  }

  async refund(paymentIntentId: string): Promise<void> {
    await this.stripe.refunds.create({ payment_intent: paymentIntentId });
  }

  /** Verifies the signature and parses the event. Throws if it is not from Stripe. */
  constructEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      throw new ServiceUnavailableException('Stripe webhooks are not configured.');
    }
    return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
  }
}
