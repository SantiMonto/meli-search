import { ShippingMode } from '../enums';

/**
 * Shipping Information
 * Represents shipping details for a product
 */
export interface Shipping {
  freeShipping: boolean;
  mode?: ShippingMode;
  logisticType?: string;
  storePickUp?: boolean;
  tags?: string[];
}

/**
 * Seller Address
 * Represents the seller's location
 */
export interface SellerAddress {
  city?: string;
  state?: string;
  country?: string;
}
