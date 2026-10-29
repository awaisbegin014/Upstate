import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const lowerTrim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class RegisterDto {
  @Transform(lowerTrim)
  @IsEmail({}, { message: 'Enter a valid email address.' })
  @MaxLength(200)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(128)
  password: string;

  @Transform(trim)
  @IsString()
  @MinLength(1, { message: 'First name is required.' })
  @MaxLength(80)
  firstName: string;

  @Transform(trim)
  @IsString()
  @MinLength(1, { message: 'Last name is required.' })
  @MaxLength(80)
  lastName: string;

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
}

export class LoginDto {
  @Transform(lowerTrim)
  @IsEmail({}, { message: 'Enter a valid email address.' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'Enter your password.' })
  @MaxLength(128)
  password: string;
}

export class UpdateProfileDto {
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  firstName?: string;

  @Transform(trim)
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  lastName?: string;

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
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters.' })
  @MaxLength(128)
  newPassword: string;
}
