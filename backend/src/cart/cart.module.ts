import {
  Body,
  Controller,
  Delete,
  Get,
  Module,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import type { AuthedRequest } from '../common/decorators/current-user.decorator.js';
import { OptionalAuthGuard } from '../common/guards/jwt-auth.guard.js';
import {
  GUEST_CART_COOKIE,
  guestCartCookieOptions,
} from './cart-identity.js';
import { CartService, type CartOwner } from './cart.service.js';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto.js';

function ownerOf(req: AuthedRequest): CartOwner {
  if (req.user) return { userId: req.user.id };
  const cookies = req.cookies as Record<string, string> | undefined;
  return { guestToken: cookies?.[GUEST_CART_COOKIE] };
}

@UseGuards(OptionalAuthGuard)
@Controller('cart')
class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  view(@Req() req: AuthedRequest) {
    return this.cart.view(ownerOf(req));
  }

  @Post('items')
  async add(
    @Req() req: AuthedRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: AddCartItemDto,
  ) {
    const { cart, issuedToken, notice } = await this.cart.add(
      ownerOf(req),
      dto.productId,
      dto.quantity,
    );
    if (issuedToken) {
      res.cookie(GUEST_CART_COOKIE, issuedToken, guestCartCookieOptions());
    }
    return { ...cart, notice };
  }

  @Patch('items/:id')
  update(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cart.update(ownerOf(req), id, dto.quantity);
  }

  @Delete('items/:id')
  remove(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.cart.remove(ownerOf(req), id);
  }

  @Delete()
  clear(@Req() req: AuthedRequest) {
    return this.cart.clear(ownerOf(req));
  }
}

@Module({
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
