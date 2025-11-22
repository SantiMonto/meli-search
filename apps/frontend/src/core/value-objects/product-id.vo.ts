const PRODUCT_ID_PATTERN = /^MLA\d+$/;

/**
 * ProductId Value Object (Frontend)
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

    if (!PRODUCT_ID_PATTERN.test(id)) {
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
   * Create from string (factory method)
   */
  static from(id: string): ProductId {
    return new ProductId(id);
  }

  /**
   * Try to create from string, returns null if invalid
   */
  static tryFrom(id: string): ProductId | null {
    try {
      return new ProductId(id);
    } catch {
      return null;
    }
  }
}
