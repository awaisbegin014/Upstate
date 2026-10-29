import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;
}

export function paginate(q: PaginationQuery, defaultSize = 24) {
  const page = q.page ?? 1;
  const pageSize = q.pageSize ?? defaultSize;
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

export function pageResult<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
