import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search query DTO
 */
export class SearchQueryDto {
  @ApiProperty({
    description: 'Search query term',
    example: 'iphone',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Number of results per page',
    example: 10,
    minimum: 1,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(PAGINATION.MAX_LIMIT)
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @ApiProperty({
    description: 'Pagination offset',
    example: 0,
    minimum: 0,
    default: PAGINATION.DEFAULT_OFFSET,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = PAGINATION.DEFAULT_OFFSET;
}
