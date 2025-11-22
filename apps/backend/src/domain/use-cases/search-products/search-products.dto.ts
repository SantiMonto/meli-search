import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search Products Input DTO
 * Validates search parameters
 */
export class SearchProductsDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(PAGINATION.MAX_LIMIT)
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = PAGINATION.DEFAULT_OFFSET;
}
