import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Suggestions query DTO
 */
export class SuggestionsQueryDto {
  @ApiProperty({
    description: 'Search query term (minimum 2 characters)',
    example: 'iph',
    minLength: 2,
    maxLength: 200,
  })
  @IsString()
  @MinLength(2)
  q: string;

  @ApiProperty({
    description: 'Maximum number of suggestions',
    example: 6,
    minimum: 1,
    maximum: 20,
    default: 6,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  limit?: number = 6;
}
