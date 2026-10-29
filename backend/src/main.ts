import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // Stripe webhook signatures are verified against the raw bytes
  });
  configureApp(app);

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  new Logger('Bootstrap').log(
    `Upstate Equipment API listening on http://localhost:${port}/api`,
  );
}

await bootstrap();
