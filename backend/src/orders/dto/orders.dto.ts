import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PaginationQuery } from '../../common/utils/pagination.js';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CheckoutDto {
  @IsIn(['SHIPPING', 'PICKUP'])
  fulfillment: 'SHIPPING' | 'PICKUP';

  @IsIn(['CARD', 'INVOICE'])
  paymentMethod: 'CARD' | 'INVOICE';

  @Transform(trim)
  @IsString()
  @MinLength(2, { message: 'Enter a contact name.' })
  @MaxLength(120)
  contactName: string;

  /** Defaults to the account email. */
  @Transform(trim)
  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email address.' })
  email?: string;

  @Transform(trim)
  @IsString()
  @Matches(/^[0-9+().\-\s]{7,25}$/, { message: 'Enter a valid phone number.' })
  phone: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  poNumber?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ValidateIf((o: CheckoutDto) => o.fulfillment === 'SHIPPING')
  @Transform(trim)
  @IsString()
  @MinLength(3, { message: 'Enter a street address.' })
  @MaxLength(160)
  shipLine1?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  shipLine2?: string;

  @ValidateIf((o: CheckoutDto) => o.fulfillment === 'SHIPPING')
  @Transform(trim)
  @IsString()
  @MinLength(2, { message: 'Enter a city.' })
  @MaxLength(80)
  shipCity?: string;

  @ValidateIf((o: CheckoutDto) => o.fulfillment === 'SHIPPING')
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @Matches(/^[A-Z]{2}$/, { message: 'Use the 2-letter state code, e.g. NY.' })
  shipState?: string;

  @ValidateIf((o: CheckoutDto) => o.fulfillment === 'SHIPPING')
  @Transform(trim)
  @Matches(/^\d{5}(-\d{4})?$/, { message: 'Enter a valid ZIP code.' })
  shipPostalCode?: string;
}

export const ORDER_STATUSES = [
  'PENDING_PAYMENT',
  'PLACED',
  'PROCESSING',
  'READY_FOR_PICKUP',
  'SHIPPED',
  'COMPLETED',
  'CANCELLED',
] as const;

export const PAYMENT_STATUSES = ['UNPAID', 'PAID', 'REFUNDED'] as const;

export class AdminOrderQuery extends PaginationQuery {
  @IsOptional()
  @IsIn(ORDER_STATUSES)
  status?: (typeof ORDER_STATUSES)[number];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;
}

export class AdminUpdateOrderDto {
  @IsOptional()
  @IsIn(ORDER_STATUSES)
  status?: (typeof ORDER_STATUSES)[number];

  @IsOptional()
  @IsIn(PAYMENT_STATUSES)
  paymentStatus?: (typeof PAYMENT_STATUSES)[number];

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNote?: string;
}
