import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';
import helmetImport from 'helmet';
import { join } from 'node:path';

// helmet ships both ESM and CommonJS typings; normalise the default import.
const helmet = ((helmetImport as unknown as { default?: unknown }).default ??
  helmetImport) as unknown as (options?: object) => RequestHandler;

export const UPLOADS_DIR = join(process.cwd(), 'uploads');

/** Global middleware, pipes and static files shared by every entry point. */
export function configureApp(app: NestExpressApplication) {
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());

  // The Next.js frontend proxies /api/* here, so trust it for client IPs.
  app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));

  app.enableCors({
    origin: (process.env.FRONTEND_URL ?? 'http://localhost:3000')
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true, // one clear message per field
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // Product images uploaded from the admin panel. The frontend rewrites
  // /uploads/* here so they are served from the storefront's own origin.
  app.useStaticAssets(UPLOADS_DIR, {
    prefix: '/uploads/',
    maxAge: '7d',
    index: false,
  });
}
