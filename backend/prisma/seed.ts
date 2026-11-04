/**
 * Idempotent seed: categories, the supplier directory from upstateeq.com, the
 * admin account, store settings and a starter product catalog.
 *
 * Re-running updates categories, brands and the admin account, but never
 * overwrites products that already exist (so admin edits survive).
 *
 *   npm run db:seed
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { slugify } from '../src/common/utils/slug.js';
import { categories } from './data/categories.js';
import { products } from './data/products.js';

interface SeedBrand {
  name: string;
  description: string;
  website: string | null;
  categories: string[];
  featured: boolean;
}

const here = dirname(fileURLToPath(import.meta.url));
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  // Categories
  const categoryIds = new Map<string, string>();
  for (const [i, c] of categories.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      create: { ...c, sortOrder: i },
      update: { ...c, sortOrder: i },
    });
    categoryIds.set(c.slug, row.id);
  }
  console.log(`✓ ${categories.length} categories`);

  // Brands (suppliers)
  const brands = JSON.parse(
    readFileSync(join(here, 'data', 'brands.json'), 'utf-8'),
  ) as SeedBrand[];
  const brandIds = new Map<string, string>();
  for (const b of brands) {
    const connect = b.categories
      .map((slug) => categoryIds.get(slug))
      .filter((id): id is string => Boolean(id))
      .map((id) => ({ id }));
    const data = {
      name: b.name,
      description: b.description,
      website: b.website,
      isFeatured: b.featured,
    };
    const slug = slugify(b.name);
    const row = await prisma.brand.upsert({
      where: { slug },
      create: { ...data, slug, categories: { connect } },
      update: { ...data, categories: { set: connect } },
    });
    brandIds.set(b.name, row.id);
  }
  console.log(`✓ ${brands.length} brands`);

  // Admin account
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password && password !== 'change-me-too') {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
      where: { email },
      create: {
        email,
        passwordHash,
        firstName: 'Store',
        lastName: 'Admin',
        role: 'ADMIN',
      },
      update: { passwordHash, role: 'ADMIN', isActive: true, tokenVersion: { increment: 1 } },
    });
    console.log(`✓ admin account ${email}`);
  } else {
    console.warn('! ADMIN_EMAIL / ADMIN_PASSWORD not set in .env — no admin account created');
  }

  // Store settings
  await prisma.storeSettings.upsert({ where: { id: 'store' }, create: { id: 'store' }, update: {} });

  // Products
  let seededProducts = 0;
  let seededImages = 0;
  for (const p of products) {
    const categoryId = categoryIds.get(p.category);
    if (!categoryId) throw new Error(`Unknown category ${p.category} for ${p.sku}`);
    const brandId = brandIds.get(p.brand);
    if (!brandId) console.warn(`! brand "${p.brand}" not found for ${p.sku}`);

    let product = await prisma.product.findUnique({
      where: { sku: p.sku },
      select: { id: true },
    });

    if (!product) {
      product = await prisma.product.create({
        data: {
          sku: p.sku,
          slug: slugify(p.name),
          name: p.name,
          shortDescription: p.short,
          description: p.description,
          priceCents: Math.round(p.price * 100),
          compareAtCents: p.compareAt ? Math.round(p.compareAt * 100) : null,
          stock: p.stock,
          isQuoteOnly: p.quoteOnly ?? false,
          isFeatured: p.featured ?? false,
          leadTime: p.leadTime ?? null,
          weightLbs: p.weight ?? null,
          categoryId,
          brandId: brandId ?? null,
          specs: {
            create: p.specs.map(([label, value], i) => ({ label, value, sortOrder: i })),
          },
        },
        select: { id: true },
      });
      seededProducts++;
    }

    if (p.image) {
      const existingImg = await prisma.productImage.findFirst({
        where: { productId: product.id },
      });
      if (!existingImg) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: p.image,
            alt: p.name,
            sortOrder: 0,
          },
        });
        seededImages++;
      } else if (existingImg.url !== p.image) {
        await prisma.productImage.update({
          where: { id: existingImg.id },
          data: { url: p.image, alt: p.name },
        });
        seededImages++;
      }
    }
  }
  console.log(`✓ ${products.length} products processed (${seededProducts} created, ${seededImages} images synced)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
