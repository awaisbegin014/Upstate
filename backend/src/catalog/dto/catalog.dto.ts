import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQuery } from '../../common/utils/pagination.js';

export const PRODUCT_SORTS = [
  'featured',
  'newest',
  'price-asc',
  'price-desc',
  'name',
] as const;
export type ProductSort = (typeof PRODUCT_SORTS)[number];

const toBool = ({ value }: { value: unknown }) =>
  value === true || value === 'true' || value === '1';

export class ProductQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @IsOptional()
  @IsIn(PRODUCT_SORTS)
  sort?: ProductSort;

  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  inStock?: boolean;
}

export class BrandQuery {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  category?: string;

  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  featured?: boolean;
}
