import {
  ProductResponse,
  ProductCondition,
  Currency,
} from '@meli/shared-types';

/**
 * Product domain entity (Frontend)
 * Represents a product with business logic for UI
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
      city: { name: string };
      state: { name: string };
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
   * Get discount amount
   */
  getDiscountAmount(): number {
    if (!this.hasDiscount()) return 0;
    return this.originalPrice! - this.price;
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
   * Get availability status text
   */
  getAvailabilityStatus(): string {
    if (!this.isAvailable()) return 'Sin stock';
    if (this.availableQuantity === 1) return 'Último disponible';
    if (this.availableQuantity! < 5) return 'Pocas unidades';
    return 'Disponible';
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

  /**
   * Get rating stars (for UI)
   */
  getRatingStars(): number {
    const rating = this.getAverageRating();
    return rating ? Math.round(rating) : 0;
  }

  /**
   * Get main image URL
   */
  getMainImageUrl(): string {
    return this.pictures?.[0]?.url || this.thumbnail || '';
  }

  /**
   * Get all image URLs
   */
  getImageUrls(): string[] {
    if (this.pictures && this.pictures.length > 0) {
      return this.pictures.map((p) => p.url);
    }
    return this.thumbnail ? [this.thumbnail] : [];
  }

  /**
   * Get installment text for UI
   */
  getInstallmentText(): string | null {
    if (!this.installments) return null;
    const { quantity, amount } = this.installments;
    return `${quantity}x $${amount.toLocaleString('es-AR')}`;
  }

  /**
   * Get seller location text
   */
  getSellerLocation(): string | null {
    if (!this.sellerAddress) return null;
    const { city, state } = this.sellerAddress;
    return `${city.name}, ${state.name}`;
  }

  /**
   * Find attribute by ID
   */
  getAttribute(attributeId: string): string | null {
    const attr = this.attributes?.find((a) => a.id === attributeId);
    return attr?.valueName ?? null;
  }

  /**
   * Get brand
   */
  getBrand(): string | null {
    return this.getAttribute('BRAND');
  }

  /**
   * Get model
   */
  getModel(): string | null {
    return this.getAttribute('MODEL');
  }

  /**
   * Create Product from API list item
   */
  static fromListItem(data: ProductResponse): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.thumbnail,
      undefined, // originalPrice
      undefined, // availableQuantity
      undefined, // soldQuantity
      data.permalink,
      undefined, // pictures
      data.installments,
      data.shipping,
      undefined, // sellerAddress
      undefined, // attributes
      undefined, // warranty
      undefined, // description
      data.reviews,
    );
  }

  /**
   * Create Product from API detail
   */
  static fromDetail(data: ProductResponse): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.pictures?.[0]?.url,
      data.originalPrice,
      data.availableQuantity,
      data.soldQuantity,
      data.permalink,
      data.pictures,
      data.installments,
      data.shipping,
      data.sellerAddress,
      data.attributes,
      data.warranty,
      data.description,
      data.reviews,
    );
  }
}
