import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Module,
  Param,
  Post,
  Req,
  UseGuards,
  type RawBodyRequest,
} from '@nestjs/common';
import type { Request } from 'express';
import { CartModule } from '../cart/cart.module.js';
import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { StripeService } from '../payments/stripe.service.js';
import { CheckoutDto } from './dto/orders.dto.js';
import { OrdersService } from './orders.service.js';

@UseGuards(JwtAuthGuard)
@Controller('orders')
class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @RateLimit({ limit: 20, ttl: 600_000 })
  @Post()
  checkout(@CurrentUser() user: AuthUser, @Body() dto: CheckoutDto) {
    return this.orders.checkout(user, dto);
  }

  @Get()
  mine(@CurrentUser() user: AuthUser) {
    return this.orders.listForUser(user.id);
  }

  @Get(':number')
  one(@CurrentUser() user: AuthUser, @Param('number') number: string) {
    return this.orders.getForUser(user, number);
  }

  @Post(':number/abandon-payment')
  @HttpCode(200)
  abandon(@CurrentUser() user: AuthUser, @Param('number') number: string) {
    return this.orders.abandonPayment(user, number);
  }
}

/** Receives payment events from Stripe. Authenticated by the webhook signature, not a login. */
@Controller('payments')
class StripeWebhookController {
  constructor(
    private readonly stripe: StripeService,
    private readonly orders: OrdersService,
  ) {}

  @RateLimit({ limit: 600, ttl: 60_000 })
  @Post('stripe/webhook')
  @HttpCode(200)
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string | undefined,
  ) {
    if (!signature || !req.rawBody) {
      throw new BadRequestException('Missing Stripe signature.');
    }
    let event;
    try {
      event = this.stripe.constructEvent(req.rawBody, signature);
    } catch {
      throw new BadRequestException('Invalid Stripe signature.');
    }
    await this.orders.handleStripeEvent(event);
    return { received: true };
  }
}

@Module({
  imports: [CartModule],
  controllers: [OrdersController, StripeWebhookController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
