import { Paging as IPaging } from '@meli/shared-types';

/**
 * Paging domain entity (Frontend)
 * Encapsulates pagination logic for UI
 */
export class Paging {
  constructor(
    public readonly total: number,
    public readonly offset: number,
    public readonly limit: number,
  ) {
    this.validatePaging();
  }

  /**
   * Validate paging parameters
   */
  private validatePaging(): void {
    if (this.total < 0) {
      throw new Error('Total cannot be negative');
    }
    if (this.offset < 0) {
      throw new Error('Offset cannot be negative');
    }
    if (this.limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }
  }

  /**
   * Calculate current page (1-indexed)
   */
  getCurrentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  /**
   * Calculate total pages
   */
  getTotalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  /**
   * Check if there's a next page
   */
  hasNextPage(): boolean {
    return this.offset + this.limit < this.total;
  }

  /**
   * Check if there's a previous page
   */
  hasPreviousPage(): boolean {
    return this.offset > 0;
  }

  /**
   * Get next page offset
   */
  getNextPageOffset(): number | null {
    return this.hasNextPage() ? this.offset + this.limit : null;
  }

  /**
   * Get previous page offset
   */
  getPreviousPageOffset(): number | null {
    return this.hasPreviousPage()
      ? Math.max(0, this.offset - this.limit)
      : null;
  }

  /**
   * Get page range for pagination UI
   * Returns array of page numbers to display
   */
  getPageRange(maxPages: number = 5): number[] {
    const totalPages = this.getTotalPages();
    const currentPage = this.getCurrentPage();

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /**
   * Get results range text (e.g., "1-10 de 100")
   */
  getResultsRangeText(): string {
    const from = this.offset + 1;
    const to = Math.min(this.offset + this.limit, this.total);
    return `${from}-${to} de ${this.total}`;
  }

  /**
   * Create from API response
   */
  static fromObject(data: IPaging): Paging {
    return new Paging(data.total, data.offset, data.limit);
  }
}
