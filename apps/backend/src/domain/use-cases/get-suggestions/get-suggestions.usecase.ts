import { Injectable, Logger, Inject } from '@nestjs/common';
import { GetSuggestionsDto } from './suggestions.dto';
import { IProductRepository } from '../../repositories/product.repository.interface';
import { InvalidSearchQueryException } from '../../exceptions/invalid-search-query.exception';
import { Product } from '../../entities/product.entity';

/**
 * Get Suggestions Use Case
 * Returns a limited list of product suggestions for autocomplete
 */
@Injectable()
export class GetSuggestionsUseCase {
  private readonly logger = new Logger(GetSuggestionsUseCase.name);
  private readonly DEFAULT_LIMIT = 6;
  private readonly MIN_QUERY_LENGTH = 2;

  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Execute the use case
   * @param dto - GetSuggestionsDto with query and optional limit
   * @returns Array of product suggestions
   */
  async execute(dto: GetSuggestionsDto): Promise<Product[]> {
    const { query, limit = this.DEFAULT_LIMIT } = dto;

    // Validate query
    if (!query || query.trim().length < this.MIN_QUERY_LENGTH) {
      throw new InvalidSearchQueryException(
        `Query must be at least ${this.MIN_QUERY_LENGTH} characters`,
      );
    }

    this.logger.log(
      `Getting suggestions for query: "${query}", limit: ${limit}`,
    );

    // Search products with the specified limit
    const searchResult = await this.productRepository.search(
      query.trim(),
      limit,
      0, // offset is always 0 for suggestions
    );

    return searchResult.products;
  }
}
