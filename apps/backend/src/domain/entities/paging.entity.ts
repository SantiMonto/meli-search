/**
 * Paging domain entity
 * Encapsulates pagination logic
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
}
