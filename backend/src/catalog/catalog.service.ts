import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';
import { pageResult, paginate } from '../common/utils/pagination.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { BrandQuery, ProductQuery, ProductSort } from './dto/catalog.dto.js';

/** Fields every product card needs. */
export const productCardSelect = {
  id: true,
  slug: true,
  sku: true,
  name: true,
  shortDescription: true,
  priceCents: true,
  compareAtCents: true,
  stock: true,
  isQuoteOnly: true,
  isFeatured: true,
  leadTime: true,
  images: {
    orderBy: { sortOrder: 'asc' },
    take: 1,
    select: { url: true, alt: true },
  },
  category: { select: { slug: true, name: true, icon: true } },
  brand: { select: { slug: true, name: true } },
} satisfies Prisma.ProductSelect;

const SORT_ORDER: Record<ProductSort, Prisma.ProductOrderByWithRelationInput[]> = {
  featured: [{ isFeatured: 'desc' }, { name: 'asc' }],
  newest: [{ createdAt: 'desc' }],
  // Quote-only items have no list price, so they always sort after priced ones.
  'price-asc': [{ isQuoteOnly: 'asc' }, { priceCents: 'asc' }],
  'price-desc': [{ isQuoteOnly: 'asc' }, { priceCents: 'desc' }],
  name: [{ name: 'asc' }],
};

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async categories() {
    const categories = await this.prisma.category.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        _count: { select: { products: { where: { isActive: true } }, brands: true } },
      },
    });
    return categories.map(({ _count, ...c }) => ({
      ...c,
      productCount: _count.products,
      brandCount: _count.brands,
    }));
  }

  async category(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        brands: {
          orderBy: { name: 'asc' },
          select: { slug: true, name: true, description: true, website: true },
        },
      },
    });
    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  brands(q: BrandQuery) {
    return this.prisma.brand.findMany({
      where: {
        ...(q.featured ? { isFeatured: true } : {}),
        ...(q.category ? { categories: { some: { slug: q.category } } } : {}),
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        website: true,
        isFeatured: true,
        categories: { select: { slug: true, name: true }, orderBy: { sortOrder: 'asc' } },
        _count: { select: { products: { where: { isActive: true } } } },
      },
    });
  }

  async products(q: ProductQuery) {
    const { page, pageSize, skip, take } = paginate(q, 24);
    const term = q.q?.trim();
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(q.category ? { category: { slug: q.category } } : {}),
      ...(q.brand ? { brand: { slug: q.brand } } : {}),
      ...(q.featured ? { isFeatured: true } : {}),
      ...(q.inStock ? { OR: [{ stock: { gt: 0 } }, { isQuoteOnly: true }] } : {}),
      // SQLite LIKE is case-insensitive for ASCII. On Postgres add mode: 'insensitive'.
      ...(term
        ? {
            AND: [
              {
                OR: [
                  { name: { contains: term } },
                  { sku: { contains: term } },
                  { shortDescription: { contains: term } },
                  { brand: { name: { contains: term } } },
                ],
              },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: SORT_ORDER[q.sort ?? 'featured'],
        skip,
        take,
        select: productCardSelect,
      }),
      this.prisma.product.count({ where }),
    ]);
    return pageResult(items, total, page, pageSize);
  }

  async product(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, isActive: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' }, select: { id: true, url: true, alt: true } },
        specs: { orderBy: { sortOrder: 'asc' }, select: { label: true, value: true } },
        category: { select: { slug: true, name: true, icon: true } },
        brand: { select: { slug: true, name: true, website: true, description: true } },
      },
    });
    if (!product) throw new NotFoundException('Product not found.');

    const related = await this.prisma.product.findMany({
      where: { isActive: true, categoryId: product.categoryId, id: { not: product.id } },
      orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
      take: 4,
      select: productCardSelect,
    });
    const { categoryId: _c, brandId: _b, ...rest } = product;
    return { ...rest, related };
  }
}
