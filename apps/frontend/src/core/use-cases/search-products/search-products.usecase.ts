import { IProductRepository } from '../../repositories/product.repository.interface';
import { SearchResult } from '../../entities/search-result.entity';
import { SearchQuery } from '../../value-objects/search-query.vo';
import {
  SearchProductsInput,
  ValidatedSearchProductsInput,
} from './search-products.input';

/**
 * Search Products Use Case
 * Orchestrates the search logic
 */
export class SearchProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Execute the use case
   */
  async execute(input: SearchProductsInput): Promise<SearchResult> {
    const validatedInput = this.validate(input);

    return this.productRepository.search(
      validatedInput.query.getValue(),
      validatedInput.limit,
      validatedInput.offset,
    );
  }

  /**
   * Validate and transform input
   */
  private validate(input: SearchProductsInput): ValidatedSearchProductsInput {
    const query = new SearchQuery(input.query);
    const limit = input.limit || 10;
    const offset = input.offset || 0;

    if (limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }

    if (offset < 0) {
      throw new Error('Offset cannot be negative');
    }

    return { query, limit, offset };
  }
}
