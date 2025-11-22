import { ProductCondition, Currency } from '../enums';

/**
 * Product Attribute
 * Represents a product attribute/specification
 */
export interface ProductAttribute {
  id: string;
  name: string;
  valueName: string;
}

/**
 * Product Image
 * Represents a product image
 */
export interface ProductImage {
  id: string;
  url: string;
}

/**
 * Product Type
 * Base product information
 */
export interface Product {
  id: string;
  title: string;
  price: number;
  currencyId: Currency;
  condition: ProductCondition;
  thumbnail?: string;
  pictures?: ProductImage[];
  availableQuantity?: number;
  soldQuantity?: number;
  description?: string;
  warranty?: string;
  attributes?: ProductAttribute[];
  permalink?: string;
  sellerAddress?: {
    city: { name: string };
    state: { name: string };
  };
}
