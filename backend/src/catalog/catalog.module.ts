import { Controller, Get, Module, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';
import { BrandQuery, ProductQuery } from './dto/catalog.dto.js';

/** Public, read-only catalog. Admin writes live in AdminModule. */
@Controller()
class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('categories')
  categories() {
    return this.catalog.categories();
  }

  @Get('categories/:slug')
  category(@Param('slug') slug: string) {
    return this.catalog.category(slug);
  }

  @Get('brands')
  brands(@Query() q: BrandQuery) {
    return this.catalog.brands(q);
  }

  @Get('products')
  products(@Query() q: ProductQuery) {
    return this.catalog.products(q);
  }

  @Get('products/:slug')
  product(@Param('slug') slug: string) {
    return this.catalog.product(slug);
  }
}

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
