import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import {
  GUEST_CART_COOKIE,
  guestCartCookieOptions,
  mergeGuestCart,
} from '../cart/cart-identity.js';
import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import {
  JwtAuthGuard,
  readToken,
  SESSION_COOKIE,
} from '../common/guards/jwt-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from './auth.service.js';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly jwtGuard: JwtAuthGuard,
    private readonly prisma: PrismaService,
  ) {}

  private cookieOptions(): CookieOptions {
    const days = Number(this.config.get('JWT_EXPIRES_IN_DAYS') ?? 7);
    return {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.get('NODE_ENV') === 'production',
      path: '/',
      maxAge: days * 24 * 60 * 60 * 1000,
    };
  }

  /** Sets the session cookie and folds any guest cart into the user's cart. */
  private async startSession(
    req: Request,
    res: Response,
    userId: string,
    token: string,
  ) {
    res.cookie(SESSION_COOKIE, token, this.cookieOptions());
    const guestToken = (req.cookies as Record<string, string> | undefined)?.[
      GUEST_CART_COOKIE
    ];
    if (guestToken) {
      await mergeGuestCart(this.prisma, guestToken, userId);
      const { maxAge: _maxAge, ...opts } = guestCartCookieOptions();
      res.clearCookie(GUEST_CART_COOKIE, opts);
    }
  }

  // 10 attempts per 10 minutes per IP.
  @RateLimit({ limit: 10, ttl: 600_000 })
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.auth.register(dto);
    await this.startSession(req, res, user.id, token);
    return { user };
  }

  @RateLimit({ limit: 10, ttl: 600_000 })
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.auth.login(dto);
    await this.startSession(req, res, user.id, token);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(
    @CurrentUser() user: AuthUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.auth.logout(user.id);
    const { maxAge: _maxAge, ...opts } = this.cookieOptions();
    res.clearCookie(SESSION_COOKIE, opts);
    return { ok: true };
  }

  /** Answers 200 with `user: null` for guests, so the storefront can poll it quietly. */
  @Get('session')
  async session(@Req() req: Request) {
    const token = readToken(req);
    const user = token ? await this.jwtGuard.userFromToken(token) : null;
    return { user: user ? await this.auth.me(user.id) : null };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return { user: await this.auth.updateProfile(user.id, dto) };
  }

  @RateLimit({ limit: 10, ttl: 600_000 })
  @UseGuards(JwtAuthGuard)
  @Post('password')
  @HttpCode(200)
  async changePassword(
    @CurrentUser() user: AuthUser,
    @Body() dto: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.auth.changePassword(user.id, dto);
    res.cookie(SESSION_COOKIE, token, this.cookieOptions());
    return { ok: true };
  }
}
