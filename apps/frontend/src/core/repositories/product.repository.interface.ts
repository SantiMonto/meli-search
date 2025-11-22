import { SearchResult } from '../entities/search-result.entity';
import { Product } from '../entities/product.entity';

/**
 * Product Repository Interface (Port)
 * Defines the contract for product data access
 */
export interface IProductRepository {
  /**
   * Search for products
   * @param query Search query
   * @param limit Max results per page
   * @param offset Pagination offset
   */
  search(query: string, limit?: number, offset?: number): Promise<SearchResult>;

  /**
   * Get product detail by ID
   * @param id Product ID
   */
  getById(id: string): Promise<Product>;
}
