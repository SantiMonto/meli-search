import { ApiProperty } from '@nestjs/swagger';
import { Currency, ProductCondition } from '@meli/shared-types';

/**
 * Product list item response DTO
 * Used in search results
 */
export class ProductListItemResponseDto {
  @ApiProperty({
    description: 'Product ID',
    example: 'MLA123456789',
  })
  id: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Apple iPhone 13 (128 GB) - Medianoche',
  })
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: 1367999,
  })
  price: number;

  @ApiProperty({
    description: 'Currency ID',
    enum: Currency,
    example: Currency.ARS,
  })
  currencyId: Currency;

  @ApiProperty({
    description: 'Product condition',
    enum: ProductCondition,
    example: ProductCondition.NEW,
  })
  condition: ProductCondition;

  @ApiProperty({
    description: 'Thumbnail URL',
    example:
      'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA123456789-012023-F.webp',
    required: false,
  })
  thumbnail?: string;

  @ApiProperty({
    description: 'Shipping information',
    required: false,
  })
  shipping?: {
    freeShipping: boolean;
    mode?: string;
    logisticType?: string;
    storePickUp?: boolean;
  };

  @ApiProperty({
    description: 'Installment information',
    required: false,
  })
  installments?: {
    quantity: number;
    amount: number;
    rate?: number;
    currencyId?: Currency;
  };

  @ApiProperty({
    description: 'Product reviews',
    required: false,
  })
  reviews?: {
    ratingAverage: number;
    total: number;
  };
}
