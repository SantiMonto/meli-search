import { Product } from './product.entity';
import { Paging } from './paging.entity';

/**
 * SearchResult domain entity
 * Encapsulates search results with products and pagination
 */
export class SearchResult {
  constructor(
    public readonly query: string,
    public readonly products: Product[],
    public readonly paging: Paging,
  ) {
    this.validateQuery();
  }

  /**
   * Validate search query
   */
  private validateQuery(): void {
    if (!this.query || this.query.trim().length === 0) {
      throw new Error('Query cannot be empty');
    }
  }

  /**
   * Check if there are results
   */
  hasResults(): boolean {
    return this.products.length > 0;
  }

  /**
   * Get number of results in current page
   */
  getResultCount(): number {
    return this.products.length;
  }

  /**
   * Get total results count
   */
  getTotalResults(): number {
    return this.paging.total;
  }

  /**
   * Filter products by condition
   */
  filterByCondition(condition: string): Product[] {
    return this.products.filter((p) => p.condition === condition);
  }

  /**
   * Filter products with free shipping
   */
  filterByFreeShipping(): Product[] {
    return this.products.filter((p) => p.hasFreeShipping());
  }

  /**
   * Filter products with discount
   */
  filterByDiscount(): Product[] {
    return this.products.filter((p) => p.hasDiscount());
  }

  /**
   * Sort products by price (ascending)
   */
  sortByPriceAsc(): Product[] {
    return [...this.products].sort((a, b) => a.price - b.price);
  }

  /**
   * Sort products by price (descending)
   */
  sortByPriceDesc(): Product[] {
    return [...this.products].sort((a, b) => b.price - a.price);
  }
}
