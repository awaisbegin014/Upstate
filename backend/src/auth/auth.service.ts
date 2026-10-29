import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import type { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayload } from '../common/guards/jwt-auth.guard.js';
import type {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from './dto/auth.dto.js';

const DUMMY_HASH = bcrypt.hashSync('timing-equaliser-not-a-password', 12);

export const publicUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  company: true,
  role: true,
  createdAt: true,
} as const;

export type PublicUser = Pick<
  User,
  'id' | 'email' | 'firstName' | 'lastName' | 'phone' | 'company' | 'role' | 'createdAt'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone || null,
        company: dto.company || null,
        passwordHash: await bcrypt.hash(dto.password, 12),
      },
    });
    return { user: await this.me(user.id), token: await this.sign(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // Compare against a dummy hash when the user is missing so response time
    // doesn't reveal which emails are registered.
    const ok = await bcrypt.compare(
      dto.password,
      user?.passwordHash ?? DUMMY_HASH,
    );
    if (!user || !ok) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    if (!user.isActive) {
      throw new UnauthorizedException(
        'This account has been deactivated. Please call us at 518.370.7000.',
      );
    }
    return { user: await this.me(user.id), token: await this.sign(user) };
  }

  /** Invalidates every outstanding token for the user. */
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }

  me(userId: string): Promise<PublicUser> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: publicUserSelect,
    });
  }

  updateProfile(userId: string, dto: UpdateProfileDto): Promise<PublicUser> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        ...(dto.phone !== undefined ? { phone: dto.phone || null } : {}),
        ...(dto.company !== undefined ? { company: dto.company || null } : {}),
      },
      select: publicUserSelect,
    });
  }

  /** Changes the password and returns a fresh token (old ones are revoked). */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!(await bcrypt.compare(dto.currentPassword, user.passwordHash))) {
      throw new BadRequestException('Your current password is incorrect.');
    }
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: await bcrypt.hash(dto.newPassword, 12),
        tokenVersion: { increment: 1 },
      },
    });
    return this.sign(updated);
  }

  private sign(user: Pick<User, 'id' | 'role' | 'tokenVersion'>) {
    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      tv: user.tokenVersion,
    };
    return this.jwt.signAsync(payload);
  }
}
