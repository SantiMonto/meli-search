import { IsString } from 'class-validator';

/**
 * Get Product Detail Input DTO
 * Validates product ID parameter
 */
export class GetProductDetailDto {
  @IsString()
  id: string;
}
