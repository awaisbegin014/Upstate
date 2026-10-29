import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Module,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminOnly } from '../common/decorators/admin-only.decorator.js';
import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { AdminOrderQuery, AdminUpdateOrderDto } from '../orders/dto/orders.dto.js';
import { OrdersModule } from '../orders/orders.module.js';
import { OrdersService } from '../orders/orders.service.js';
import { SettingsService } from '../settings/settings.service.js';
import { AdminCatalogService } from './admin-catalog.service.js';
import { AdminService } from './admin.service.js';
import {
  AdminCustomerQuery,
  AdminInquiryQuery,
  AdminProductQuery,
  AdminUpdateCustomerDto,
  AdminUpdateInquiryDto,
  BrandInput,
  CategoryInput,
  ProductInput,
  SettingsInput,
} from './dto/admin.dto.js';
import { MAX_UPLOAD_BYTES, saveProductImage } from './uploads.js';

@AdminOnly()
@Controller('admin')
class AdminController {
  constructor(
    private readonly admin: AdminService,
    private readonly catalog: AdminCatalogService,
    private readonly orders: OrdersService,
    private readonly settings: SettingsService,
  ) {}

  @Get('stats')
  stats() {
    return this.admin.stats();
  }

  // ---- products
  @Get('products')
  products(@Query() q: AdminProductQuery) {
    return this.catalog.listProducts(q);
  }

  @Get('products/:id')
  product(@Param('id') id: string) {
    return this.catalog.getProduct(id);
  }

  @Post('products')
  createProduct(@Body() dto: ProductInput) {
    return this.catalog.createProduct(dto);
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() dto: ProductInput) {
    return this.catalog.updateProduct(id, dto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.catalog.deleteProduct(id);
  }

  @Post('uploads')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_UPLOAD_BYTES } }))
  upload(@UploadedFile() file: Express.Multer.File | undefined) {
    return saveProductImage(file);
  }

  // ---- categories
  @Get('categories')
  categories() {
    return this.catalog.listCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CategoryInput) {
    return this.catalog.createCategory(dto);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: CategoryInput) {
    return this.catalog.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.catalog.deleteCategory(id);
  }

  // ---- brands
  @Get('brands')
  brands() {
    return this.catalog.listBrands();
  }

  @Post('brands')
  createBrand(@Body() dto: BrandInput) {
    return this.catalog.createBrand(dto);
  }

  @Put('brands/:id')
  updateBrand(@Param('id') id: string, @Body() dto: BrandInput) {
    return this.catalog.updateBrand(id, dto);
  }

  @Delete('brands/:id')
  deleteBrand(@Param('id') id: string) {
    return this.catalog.deleteBrand(id);
  }

  // ---- orders
  @Get('orders')
  orderList(@Query() q: AdminOrderQuery) {
    return this.orders.adminList(q);
  }

  @Get('orders/:number')
  order(@Param('number') number: string) {
    return this.orders.adminGet(number);
  }

  @Patch('orders/:number')
  updateOrder(@Param('number') number: string, @Body() dto: AdminUpdateOrderDto) {
    return this.orders.adminUpdate(number, dto);
  }

  // ---- customers
  @Get('customers')
  customers(@Query() q: AdminCustomerQuery) {
    return this.admin.customers(q);
  }

  @Patch('customers/:id')
  updateCustomer(
    @CurrentUser() me: AuthUser,
    @Param('id') id: string,
    @Body() dto: AdminUpdateCustomerDto,
  ) {
    return this.admin.updateCustomer(me, id, dto);
  }

  // ---- inquiries
  @Get('inquiries')
  inquiries(@Query() q: AdminInquiryQuery) {
    return this.admin.inquiries(q);
  }

  @Patch('inquiries/:id')
  updateInquiry(@Param('id') id: string, @Body() dto: AdminUpdateInquiryDto) {
    return this.admin.updateInquiry(id, dto.status);
  }

  @Delete('inquiries/:id')
  deleteInquiry(@Param('id') id: string) {
    return this.admin.deleteInquiry(id);
  }

  // ---- settings
  @Get('settings')
  getSettings() {
    return this.settings.get();
  }

  @Put('settings')
  updateSettings(@Body() dto: SettingsInput) {
    return this.settings.update(dto);
  }
}

@Module({
  imports: [OrdersModule],
  controllers: [AdminController],
  providers: [AdminService, AdminCatalogService],
})
export class AdminModule {}
