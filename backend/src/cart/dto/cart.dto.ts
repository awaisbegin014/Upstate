import { IsInt, IsString, Max, Min } from 'class-validator';

export const MAX_LINE_QTY = 999;

export class AddCartItemDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(MAX_LINE_QTY)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  @Max(MAX_LINE_QTY)
  quantity: number;
}
