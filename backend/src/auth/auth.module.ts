import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtAuthGuard,
  OptionalAuthGuard,
} from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

/** Global so every module can use the guards without re-importing. */
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret || secret === 'change-me') {
          throw new Error('JWT_SECRET must be set to a long random string in backend/.env');
        }
        const days = Number(config.get('JWT_EXPIRES_IN_DAYS') ?? 7);
        return { secret, signOptions: { expiresIn: `${days}d` } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, OptionalAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, OptionalAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
