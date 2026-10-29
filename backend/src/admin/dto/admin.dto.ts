import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PaginationQuery } from '../../common/utils/pagination.js';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Local upload paths or absolute https URLs. */
const IMAGE_URL = /^(\/(uploads|images)\/[\w\-./]+|https:\/\/\S+)$/;

export class ProductImageInput {
  @IsString()
  @Matches(IMAGE_URL, { message: 'Image must be an uploaded file or an https URL.' })
  @MaxLength(500)
  url: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  alt?: string;
}

export class ProductSpecInput {
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  label: string;

  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  value: string;
}

export class ProductInput {
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  name: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @Matches(SLUG, { message: 'Slug may only contain lowercase letters, numbers and dashes.' })
  @MaxLength(80)
  slug?: string;

  @Transform(trim)
  @IsString()
  @Matches(/^[A-Za-z0-9\-_.]{2,40}$/, { message: 'SKU: 2–40 letters, numbers, dashes or dots.' })
  sku: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(300)
  shortDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10_000)
  description?: string;

  @IsInt()
  @Min(0)
  @Max(100_000_000)
  priceCents: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000_000)
  compareAtCents?: number | null;

  @IsInt()
  @Min(0)
  @Max(1_000_000)
  stock: number;

  @IsBoolean()
  isQuoteOnly: boolean;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isFeatured: boolean;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(80)
  leadTime?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100_000)
  weightLbs?: number | null;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  brandId?: string | null;

  @IsArray()
  @ArrayMaxSize(12)
  @ValidateNested({ each: true })
  @Type(() => ProductImageInput)
  images: ProductImageInput[];

  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => ProductSpecInput)
  specs: ProductSpecInput[];
}

export class AdminProductQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'low-stock'])
  status?: 'active' | 'inactive' | 'low-stock';
}

export class CategoryInput {
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @Matches(SLUG, { message: 'Slug may only contain lowercase letters, numbers and dashes.' })
  @MaxLength(80)
  slug?: string;

  @Transform(trim)
  @IsString()
  @MaxLength(200)
  tagline: string;

  @IsString()
  @MaxLength(4000)
  description: string;

  @Transform(trim)
  @IsString()
  @MaxLength(40)
  icon: string;

  @IsOptional()
  @IsString()
  @Matches(IMAGE_URL, { message: 'Image must be an uploaded file or an https URL.' })
  @MaxLength(500)
  imageUrl?: string | null;

  @IsInt()
  @Min(0)
  @Max(1000)
  sortOrder: number;
}

export class BrandInput {
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @Matches(SLUG, { message: 'Slug may only contain lowercase letters, numbers and dashes.' })
  @MaxLength(80)
  slug?: string;

  @Transform(trim)
  @IsString()
  @MaxLength(300)
  description: string;

  @Transform(trim)
  @IsOptional()
  @IsUrl({ require_protocol: true }, { message: 'Website must start with https://' })
  @MaxLength(300)
  website?: string | null;

  @IsBoolean()
  isFeatured: boolean;

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];
}

export class AdminCustomerQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;
}

export class AdminUpdateCustomerDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsIn(['CUSTOMER', 'ADMIN'])
  role?: 'CUSTOMER' | 'ADMIN';
}

export class AdminInquiryQuery extends PaginationQuery {
  @IsOptional()
  @IsIn(['NEW', 'IN_PROGRESS', 'CLOSED'])
  status?: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
}

export class AdminUpdateInquiryDto {
  @IsIn(['NEW', 'IN_PROGRESS', 'CLOSED'])
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
}

export class SettingsInput {
  @IsInt()
  @Min(0)
  @Max(2500)
  taxRateBps: number;

  @IsInt()
  @Min(0)
  @Max(10_000_000)
  flatShippingCents: number;

  @IsInt()
  @Min(0)
  @Max(100_000_000)
  freeShippingThresholdCents: number;

  @IsBoolean()
  pickupEnabled: boolean;

  @IsBoolean()
  invoiceEnabled: boolean;
}
