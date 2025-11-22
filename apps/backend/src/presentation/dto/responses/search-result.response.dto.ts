import { ApiProperty } from '@nestjs/swagger';
import { ProductListItemResponseDto } from './product-list-item.response.dto';

/**
 * Paging information
 */
class PagingDto {
  @ApiProperty({ description: 'Total results', example: 1500 })
  total: number;

  @ApiProperty({ description: 'Current offset', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Results per page', example: 10 })
  limit: number;
}

/**
 * Search result response DTO
 */
export class SearchResultResponseDto {
  @ApiProperty({
    description: 'Search query',
    example: 'iphone',
  })
  query: string;

  @ApiProperty({
    description: 'Search results',
    type: [ProductListItemResponseDto],
  })
  results: ProductListItemResponseDto[];

  @ApiProperty({
    description: 'Pagination information',
    type: PagingDto,
  })
  paging: PagingDto;
}
