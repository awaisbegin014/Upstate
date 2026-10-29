import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { pageResult, paginate } from '../common/utils/pagination.js';
import { slugify } from '../common/utils/slug.js';
import type { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type {
  AdminProductQuery,
  BrandInput,
  CategoryInput,
  ProductInput,
} from './dto/admin.dto.js';

export const LOW_STOCK = 5;

/** Admin writes for products, categories and brands. */
@Injectable()
export class AdminCatalogService {
  constructor(private readonly prisma: PrismaService) {}

  // --------------------------------------------------------------- products

  async listProducts(q: AdminProductQuery) {
    const { page, pageSize, skip, take } = paginate(q, 25);
    const term = q.q?.trim();
    const where: Prisma.ProductWhereInput = {
      ...(q.categoryId ? { categoryId: q.categoryId } : {}),
      ...(q.status === 'active' ? { isActive: true } : {}),
      ...(q.status === 'inactive' ? { isActive: false } : {}),
      ...(q.status === 'low-stock'
        ? { isActive: true, isQuoteOnly: false, stock: { lte: LOW_STOCK } }
        : {}),
      ...(term
        ? { OR: [{ name: { contains: term } }, { sku: { contains: term } }] }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take,
        select: {
          id: true,
          slug: true,
          sku: true,
          name: true,
          priceCents: true,
          stock: true,
          isActive: true,
          isFeatured: true,
          isQuoteOnly: true,
          updatedAt: true,
          images: { orderBy: { sortOrder: 'asc' }, take: 1, select: { url: true } },
          category: { select: { id: true, name: true, icon: true } },
          brand: { select: { name: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);
    return pageResult(items, total, page, pageSize);
  }

  async getProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        specs: { orderBy: { sortOrder: 'asc' } },
        category: { select: { slug: true, name: true } },
      },
    });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async createProduct(dto: ProductInput) {
    const slug = await this.uniqueProductSlug(dto.slug || slugify(dto.name));
    await this.assertSkuFree(dto.sku);
    const product = await this.prisma.product.create({
      data: {
        ...this.productFields(dto),
        slug,
        images: { create: dto.images.map((img, i) => ({ url: img.url, alt: img.alt ?? '', sortOrder: i })) },
        specs: { create: dto.specs.map((s, i) => ({ label: s.label, value: s.value, sortOrder: i })) },
      },
    });
    return this.getProduct(product.id);
  }

  async updateProduct(id: string, dto: ProductInput) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Product not found.');
    const slug =
      dto.slug && dto.slug !== existing.slug
        ? await this.uniqueProductSlug(dto.slug, id)
        : existing.slug;
    if (dto.sku !== existing.sku) await this.assertSkuFree(dto.sku, id);

    await this.prisma.$transaction([
      this.prisma.productImage.deleteMany({ where: { productId: id } }),
      this.prisma.productSpec.deleteMany({ where: { productId: id } }),
      this.prisma.product.update({
        where: { id },
        data: {
          ...this.productFields(dto),
          slug,
          images: { create: dto.images.map((img, i) => ({ url: img.url, alt: img.alt ?? '', sortOrder: i })) },
          specs: { create: dto.specs.map((s, i) => ({ label: s.label, value: s.value, sortOrder: i })) },
        },
      }),
    ]);
    return this.getProduct(id);
  }

  async deleteProduct(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Product not found.');
    // Order lines keep their snapshot (productId is set to null).
    await this.prisma.product.delete({ where: { id } });
    return { ok: true };
  }

  private productFields(dto: ProductInput) {
    return {
      name: dto.name,
      sku: dto.sku,
      shortDescription: dto.shortDescription ?? '',
      description: dto.description ?? '',
      priceCents: dto.priceCents,
      compareAtCents: dto.compareAtCents ?? null,
      stock: dto.stock,
      isQuoteOnly: dto.isQuoteOnly,
      isActive: dto.isActive,
      isFeatured: dto.isFeatured,
      leadTime: dto.leadTime || null,
      weightLbs: dto.weightLbs ?? null,
      categoryId: dto.categoryId,
      brandId: dto.brandId || null,
    } satisfies Prisma.ProductUncheckedUpdateInput;
  }

  private async uniqueProductSlug(base: string, exceptId?: string) {
    const root = slugify(base) || 'product';
    for (let n = 1; n < 100; n++) {
      const slug = n === 1 ? root : `${root}-${n}`;
      const clash = await this.prisma.product.findUnique({ where: { slug }, select: { id: true } });
      if (!clash || clash.id === exceptId) return slug;
    }
    throw new ConflictException('Could not find a free URL slug for this product.');
  }

  private async assertSkuFree(sku: string, exceptId?: string) {
    const clash = await this.prisma.product.findUnique({ where: { sku }, select: { id: true } });
    if (clash && clash.id !== exceptId) {
      throw new ConflictException(`SKU ${sku} is already used by another product.`);
    }
  }

  // ------------------------------------------------------------- categories

  async listCategories() {
    const categories = await this.prisma.category.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { products: true, brands: true } } },
    });
    return categories.map(({ _count, ...c }) => ({
      ...c,
      productCount: _count.products,
      brandCount: _count.brands,
    }));
  }

  async createCategory(dto: CategoryInput) {
    const slug = slugify(dto.slug || dto.name);
    if (await this.prisma.category.findUnique({ where: { slug } })) {
      throw new ConflictException(`A category with the URL "${slug}" already exists.`);
    }
    return this.prisma.category.create({ data: { ...dto, slug, imageUrl: dto.imageUrl || null } });
  }

  async updateCategory(id: string, dto: CategoryInput) {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Category not found.');
    const slug = slugify(dto.slug || existing.slug);
    if (slug !== existing.slug && (await this.prisma.category.findUnique({ where: { slug } }))) {
      throw new ConflictException(`A category with the URL "${slug}" already exists.`);
    }
    return this.prisma.category.update({
      where: { id },
      data: { ...dto, slug, imageUrl: dto.imageUrl || null },
    });
  }

  async deleteCategory(id: string) {
    const count = await this.prisma.product.count({ where: { categoryId: id } });
    if (count > 0) {
      throw new BadRequestException(
        `This category still has ${count} product(s). Move or delete them first.`,
      );
    }
    await this.prisma.category.delete({ where: { id } });
    return { ok: true };
  }

  // ----------------------------------------------------------------- brands

  listBrands() {
    return this.prisma.brand.findMany({
      orderBy: { name: 'asc' },
      include: {
        categories: { select: { id: true, name: true }, orderBy: { sortOrder: 'asc' } },
        _count: { select: { products: true } },
      },
    });
  }

  async createBrand(dto: BrandInput) {
    const slug = slugify(dto.slug || dto.name);
    if (await this.prisma.brand.findUnique({ where: { slug } })) {
      throw new ConflictException(`A brand with the URL "${slug}" already exists.`);
    }
    const { categoryIds, ...fields } = dto;
    return this.prisma.brand.create({
      data: {
        ...fields,
        slug,
        website: dto.website || null,
        categories: { connect: categoryIds.map((id) => ({ id })) },
      },
    });
  }

  async updateBrand(id: string, dto: BrandInput) {
    const existing = await this.prisma.brand.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Brand not found.');
    const slug = slugify(dto.slug || existing.slug);
    if (slug !== existing.slug && (await this.prisma.brand.findUnique({ where: { slug } }))) {
      throw new ConflictException(`A brand with the URL "${slug}" already exists.`);
    }
    const { categoryIds, ...fields } = dto;
    return this.prisma.brand.update({
      where: { id },
      data: {
        ...fields,
        slug,
        website: dto.website || null,
        categories: { set: categoryIds.map((cid) => ({ id: cid })) },
      },
    });
  }

  async deleteBrand(id: string) {
    await this.prisma.brand.delete({ where: { id } });
    return { ok: true };
  }
}
