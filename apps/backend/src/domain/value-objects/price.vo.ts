import { Currency } from '@meli/shared-types';

/**
 * Price Value Object
 * Encapsulates price with currency and discount logic
 */
export class Price {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency,
    public readonly originalAmount?: number,
  ) {
    this.validate();
  }

  /**
   * Validate price
   */
  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Price amount cannot be negative');
    }

    if (this.originalAmount !== undefined && this.originalAmount < 0) {
      throw new Error('Original price amount cannot be negative');
    }

    if (
      this.originalAmount !== undefined &&
      this.originalAmount < this.amount
    ) {
      throw new Error('Original price cannot be less than current price');
    }
  }

  /**
   * Check if has discount
   */
  hasDiscount(): boolean {
    return !!this.originalAmount && this.originalAmount > this.amount;
  }

  /**
   * Get discount amount
   */
  getDiscountAmount(): number {
    if (!this.hasDiscount() || !this.originalAmount) return 0;
    return this.originalAmount - this.amount;
  }

  /**
   * Get discount percentage
   */
  getDiscountPercentage(): number {
    if (!this.hasDiscount() || !this.originalAmount) return 0;
    return Math.round((this.getDiscountAmount() / this.originalAmount) * 100);
  }

  /**
   * Compare with another price (same currency)
   */
  isGreaterThan(other: Price): boolean {
    this.ensureSameCurrency(other);
    return this.amount > other.amount;
  }

  /**
   * Compare with another price (same currency)
   */
  isLessThan(other: Price): boolean {
    this.ensureSameCurrency(other);
    return this.amount < other.amount;
  }

  /**
   * Ensure same currency for comparison
   */
  private ensureSameCurrency(other: Price): void {
    if (this.currency !== other.currency) {
      throw new Error('Cannot compare prices with different currencies');
    }
  }

  /**
   * Check equality
   */
  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
