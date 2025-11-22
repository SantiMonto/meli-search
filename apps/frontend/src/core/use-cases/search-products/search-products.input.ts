import { SearchQuery } from '../../value-objects/search-query.vo';

/**
 * Input for SearchProductsUseCase
 */
export interface SearchProductsInput {
  query: string;
  limit?: number;
  offset?: number;
}

/**
 * Validated input for SearchProductsUseCase
 */
export interface ValidatedSearchProductsInput {
  query: SearchQuery;
  limit: number;
  offset: number;
}
