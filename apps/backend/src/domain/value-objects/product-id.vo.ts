/**
 * ProductId Value Object
 * Ensures product ID is always valid
 */
export class ProductId {
  private readonly value: string;

  constructor(id: string) {
    this.validate(id);
    this.value = id;
  }

  /**
   * Validate product ID format
   */
  private validate(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }

    // MLA format validation (MLA followed by numbers)
    const pattern = /^MLA\d+$/;
    if (!pattern.test(id)) {
      throw new Error(
        `Invalid product ID format: ${id}. Expected format: MLA followed by numbers`,
      );
    }
  }

  /**
   * Get the value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Check equality
   */
  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  /**
   * Convert to string
   */
  toString(): string {
    return this.value;
  }

  /**
   * Create from string
   */
  static from(id: string): ProductId {
    return new ProductId(id);
  }
}
