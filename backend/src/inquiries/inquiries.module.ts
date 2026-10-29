import { Body, Controller, Logger, Module, Post } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateInquiryDto {
  @IsOptional()
  @IsIn(['QUOTE', 'CONTACT'])
  kind?: 'QUOTE' | 'CONTACT';

  @Transform(trim)
  @IsString()
  @MinLength(2, { message: 'Enter your name.' })
  @MaxLength(120)
  name: string;

  @Transform(trim)
  @IsEmail({}, { message: 'Enter a valid email address.' })
  @MaxLength(200)
  email: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  subject?: string;

  @Transform(trim)
  @IsString()
  @MinLength(5, { message: 'Tell us a little about what you need.' })
  @MaxLength(5000)
  message: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  productSlug?: string;

  /** Honeypot: real visitors never fill this hidden field. */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}

/** Quote requests and contact messages from the public site. */
@Controller('inquiries')
class InquiriesController {
  private readonly logger = new Logger('Inquiries');

  constructor(private readonly prisma: PrismaService) {}

  @RateLimit({ limit: 5, ttl: 600_000 })
  @Post()
  async create(@Body() dto: CreateInquiryDto) {
    if (dto.website) return { ok: true }; // bot: accept silently, store nothing
    const product = dto.productSlug
      ? await this.prisma.product.findUnique({
          where: { slug: dto.productSlug },
          select: { slug: true, name: true },
        })
      : null;
    const inquiry = await this.prisma.inquiry.create({
      data: {
        kind: dto.kind ?? (product ? 'QUOTE' : 'CONTACT'),
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        company: dto.company || null,
        subject: dto.subject || null,
        message: dto.message,
        productSlug: product?.slug ?? null,
        productName: product?.name ?? null,
      },
    });
    this.logger.log(`New ${inquiry.kind.toLowerCase()} request from ${inquiry.email}`);
    return { ok: true };
  }
}

@Module({ controllers: [InquiriesController] })
export class InquiriesModule {}
