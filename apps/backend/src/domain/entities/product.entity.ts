import { ProductCondition, Currency } from '@meli/shared-types';

/**
 * Product domain entity
 * Represents a product with business logic
 */
export class Product {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currencyId: Currency,
    public readonly condition: ProductCondition,
    public readonly thumbnail?: string,
    public readonly originalPrice?: number,
    public readonly availableQuantity?: number,
    public readonly soldQuantity?: number,
    public readonly permalink?: string,
    public readonly pictures?: Array<{ id: string; url: string }>,
    public readonly installments?: {
      quantity: number;
      amount: number;
      rate?: number;
      currencyId?: Currency;
    },
    public readonly shipping?: {
      freeShipping: boolean;
      mode?: string;
      logisticType?: string;
      storePickUp?: boolean;
    },
    public readonly sellerAddress?: {
      city?: { name: string };
      state?: { name: string };
    },
    public readonly attributes?: Array<{
      id: string;
      name: string;
      valueName: string;
    }>,
    public readonly warranty?: string,
    public readonly description?: string,
    public readonly reviews?: {
      ratingAverage: number;
      total: number;
    },
  ) {}

  /**
   * Check if product has discount
   */
  hasDiscount(): boolean {
    return !!this.originalPrice && this.originalPrice > this.price;
  }

  /**
   * Calculate discount percentage
   */
  getDiscountPercentage(): number {
    if (!this.hasDiscount()) return 0;
    return Math.round(
      ((this.originalPrice! - this.price) / this.originalPrice!) * 100,
    );
  }

  /**
   * Check if product has free shipping
   */
  hasFreeShipping(): boolean {
    return this.shipping?.freeShipping ?? false;
  }

  /**
   * Check if product is new
   */
  isNew(): boolean {
    return this.condition === ProductCondition.NEW;
  }

  /**
   * Check if product is available
   */
  isAvailable(): boolean {
    return (this.availableQuantity ?? 0) > 0;
  }

  /**
   * Get average rating
   */
  getAverageRating(): number | null {
    return this.reviews?.ratingAverage ?? null;
  }

  /**
   * Check if product has good rating (>= 4.0)
   */
  hasGoodRating(): boolean {
    const rating = this.getAverageRating();
    return rating !== null && rating >= 4.0;
  }
}
