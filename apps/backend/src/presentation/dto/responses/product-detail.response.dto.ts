import { ApiProperty } from '@nestjs/swagger';
import { ProductListItemResponseDto } from './product-list-item.response.dto';

/**
 * Product detail response DTO
 * Used in product detail view
 */
export class ProductDetailResponseDto extends ProductListItemResponseDto {
  @ApiProperty({
    description: 'Original price before discount',
    required: false,
    example: 1523244.99,
  })
  originalPrice?: number;

  @ApiProperty({
    description: 'Available quantity',
    required: false,
    example: 15,
  })
  availableQuantity?: number;

  @ApiProperty({
    description: 'Sold quantity',
    required: false,
    example: 342,
  })
  soldQuantity?: number;

  @ApiProperty({
    description: 'Product permalink',
    required: false,
    example: 'https://www.mercadolibre.com.ar/p/MLA123456789',
  })
  permalink?: string;

  @ApiProperty({
    description: 'Product pictures',
    required: false,
    type: [Object],
  })
  pictures?: Array<{ id: string; url: string }>;

  @ApiProperty({
    description: 'Seller address',
    required: false,
  })
  sellerAddress?: {
    city?: { name: string };
    state?: { name: string };
  };

  @ApiProperty({
    description: 'Product attributes',
    required: false,
    type: [Object],
  })
  attributes?: Array<{
    id: string;
    name: string;
    valueName: string;
  }>;

  @ApiProperty({
    description: 'Warranty information',
    required: false,
    example: 'Garantía del vendedor: 12 meses',
  })
  warranty?: string;

  @ApiProperty({
    description: 'Product description',
    required: false,
  })
  description?: string;
}
