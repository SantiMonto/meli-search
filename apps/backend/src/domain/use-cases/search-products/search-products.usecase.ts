import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../repositories';
import { SearchResult } from '../../entities';
import { InvalidSearchQueryException } from '../../exceptions';
import { SearchProductsDto } from './search-products.dto';

/**
 * Search Products Use Case
 * Handles product search business logic
 */
@Injectable()
export class SearchProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Execute search
   */
  async execute(dto: SearchProductsDto): Promise<SearchResult> {
    // Validate query
    if (!dto.query || dto.query.trim().length === 0) {
      throw new InvalidSearchQueryException('Query cannot be empty');
    }

    if (dto.query.length > 100) {
      throw new InvalidSearchQueryException(
        'Query too long (max 100 characters)',
      );
    }

    // Execute search through repository
    return await this.productRepository.search(
      dto.query.trim(),
      dto.limit ?? 10,
      dto.offset ?? 0,
    );
  }
}
