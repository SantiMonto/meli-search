import { ProductResponse } from './product.interface';

/**
 * Paging Information
 * Pagination metadata
 */
export interface Paging {
  total: number;
  offset: number;
  limit: number;
}

/**
 * Search Result API Response
 * Search results with pagination
 */
export interface SearchResultResponse {
  results: ProductResponse[];
  paging: Paging;
}
