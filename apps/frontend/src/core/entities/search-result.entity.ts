import { SearchResultResponse } from '@meli/shared-types';
import { Product } from './product.entity';
import { Paging } from './paging.entity';

/**
 * SearchResult domain entity (Frontend)
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
   * Get results summary text
   */
  getResultsSummary(): string {
    const total = this.getTotalResults();
    if (total === 0) return 'No se encontraron resultados';
    if (total === 1) return '1 resultado';
    return `${total.toLocaleString('es-AR')} resultados`;
  }

  /**
   * Filter products by condition
   */
  filterByCondition(condition: string): Product[] {
    return this.products.filter((p) => p.condition === condition);
  }

  /**
   * Get new products count
   */
  getNewProductsCount(): number {
    return this.products.filter((p) => p.isNew()).length;
  }

  /**
   * Get used products count
   */
  getUsedProductsCount(): number {
    return this.products.filter((p) => !p.isNew()).length;
  }

  /**
   * Filter products with free shipping
   */
  filterByFreeShipping(): Product[] {
    return this.products.filter((p) => p.hasFreeShipping());
  }

  /**
   * Get free shipping products count
   */
  getFreeShippingCount(): number {
    return this.products.filter((p) => p.hasFreeShipping()).length;
  }

  /**
   * Filter products with discount
   */
  filterByDiscount(): Product[] {
    return this.products.filter((p) => p.hasDiscount());
  }

  /**
   * Get products with discount count
   */
  getDiscountProductsCount(): number {
    return this.products.filter((p) => p.hasDiscount()).length;
  }

  /**
   * Get price range
   */
  getPriceRange(): { min: number; max: number } | null {
    if (this.products.length === 0) return null;

    const prices = this.products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
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

  /**
   * Sort products by relevance (default API order)
   */
  sortByRelevance(): Product[] {
    return [...this.products];
  }

  /**
   * Create from API response
   */
  static fromResponse(data: SearchResultResponse): SearchResult {
    const products = data.results.map((item) => Product.fromListItem(item));
    const paging = Paging.fromObject(data.paging);
    return new SearchResult(data.query, products, paging);
  }
}
