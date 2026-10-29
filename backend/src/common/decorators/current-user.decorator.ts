import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { Role } from '../../generated/prisma/client.js';

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export type AuthedRequest = Request & { user?: AuthUser };

/** The signed-in user (undefined on routes guarded only by OptionalAuthGuard). */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined =>
    ctx.switchToHttp().getRequest<AuthedRequest>().user,
);
