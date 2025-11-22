import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '@meli/shared-types';

/**
 * Error response DTO
 */
export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/v1/products/MLA123',
  })
  path: string;

  @ApiProperty({
    description: 'HTTP method',
    example: 'GET',
  })
  method: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Product with ID MLA123 not found',
  })
  message: string;

  @ApiProperty({
    description: 'Error name',
    example: 'Not Found',
    required: false,
  })
  error?: string;

  @ApiProperty({
    description: 'Error code',
    enum: ErrorCode,
    example: ErrorCode.PRODUCT_NOT_FOUND,
    required: false,
  })
  code?: ErrorCode;

  @ApiProperty({
    description: 'Additional error details',
    required: false,
  })
  details?: Record<string, unknown>;
}
