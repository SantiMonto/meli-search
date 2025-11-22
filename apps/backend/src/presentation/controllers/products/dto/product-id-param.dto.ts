import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

/**
 * Product ID parameter DTO
 */
export class ProductIdParamDto {
  @ApiProperty({
    description: 'Product ID',
    example: 'MLA123456789',
    pattern: '^MLA\\d+$',
  })
  @IsString()
  @Matches(/^MLA\d+$/, {
    message:
      'Invalid product ID format. Expected format: MLA followed by numbers',
  })
  id: string;
}
