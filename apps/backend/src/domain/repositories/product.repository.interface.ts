import { Product } from '../entities/product.entity';
import { SearchResult } from '../entities/search-result.entity';

/**
 * Product repository interface (Port)
 * Defines the contract for product data access
 * Implementations will be in the infrastructure layer
 */
export interface IProductRepository {
  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Maximum number of results
   * @param offset - Pagination offset
   * @returns SearchResult with products and pagination
   * @throws InvalidSearchQueryException if query is invalid
   * @throws Error if search fails
   */
  search(query: string, limit: number, offset: number): Promise<SearchResult>;

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product if found
   * @throws ProductNotFoundException if product not found
   * @throws Error if retrieval fails
   */
  findById(id: string): Promise<Product>;
}
