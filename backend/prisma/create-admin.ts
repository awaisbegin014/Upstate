/**
 * Create a store admin account, or promote an existing account to admin.
 *
 *   npm run admin:create -- --email jimr@upstateeq.com --first Jim --last Reinhardt
 *
 * The password is typed at a hidden prompt (twice) and only its bcrypt hash is
 * stored, so it never appears in shell history, logs or source control. Run it
 * in an interactive terminal with DATABASE_URL pointing at the target database.
 *
 * If the email already has an account, it is promoted to ADMIN, reactivated,
 * given the new password, and signed out of existing sessions.
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const MIN_PASSWORD_LENGTH = 12;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith('--') ? value.trim() : undefined;
}

/** Reads one line from the terminal without echoing it. */
function promptHidden(question: string): Promise<string> {
  const stdin = process.stdin;
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error('Run this in an interactive terminal so the password can be typed privately.'));
      return;
    }
    process.stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let input = '';
    const done = (value: string | Error) => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
      process.stdout.write('\n');
      if (value instanceof Error) reject(value);
      else resolve(value);
    };
    const onData = (chunk: string) => {
      for (const ch of chunk) {
        if (ch === '\r' || ch === '\n') return done(input);
        if (ch === '\u0003') return done(new Error('Cancelled.'));
        if (ch === '\u007f' || ch === '\b') input = input.slice(0, -1);
        else if (ch >= ' ') input += ch;
      }
    };
    stdin.on('data', onData);
  });
}

async function main() {
  const email = arg('email')?.toLowerCase();
  const firstName = arg('first');
  const lastName = arg('last');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !firstName || !lastName) {
    throw new Error(
      'Usage: npm run admin:create -- --email <email> --first <first name> --last <last name>',
    );
  }
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set (see backend/.env).');

  const host = new URL(process.env.DATABASE_URL).host;
  console.log(`Database: ${host}`);
  console.log(`Admin account: ${firstName} ${lastName} <${email}>`);

  const password = await promptHidden(`Password (min ${MIN_PASSWORD_LENGTH} characters): `);
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if ((await promptHidden('Confirm password: ')) !== password) {
    throw new Error('Passwords do not match.');
  }
  const passwordHash = await bcrypt.hash(password, 12);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  try {
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    await prisma.user.upsert({
      where: { email },
      create: { email, passwordHash, firstName, lastName, role: 'ADMIN' },
      update: {
        passwordHash,
        firstName,
        lastName,
        role: 'ADMIN',
        isActive: true,
        tokenVersion: { increment: 1 },
      },
    });
    console.log(
      existing
        ? `✓ ${email} already existed: promoted to admin and password updated.`
        : `✓ Admin account created for ${email}.`,
    );
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e: unknown) => {
  console.error(`✗ ${e instanceof Error ? e.message : String(e)}`);
  process.exitCode = 1;
});
