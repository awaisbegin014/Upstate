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

// No top-level await: Hostinger's Node.js runner (LiteSpeed lsnode) loads the
// entry file with require(), which cannot load an ES module that uses it.
bootstrap().catch((err: unknown) => {
  new Logger('Bootstrap').error(err instanceof Error ? (err.stack ?? err.message) : String(err));
  process.exit(1);
});
