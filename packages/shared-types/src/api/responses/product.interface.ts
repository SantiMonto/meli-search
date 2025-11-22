import { Product } from '../../domain';
import { Shipping } from '../../domain';
import { Installments } from '../../domain';
import { Reviews } from '../../domain';

/**
 * Product API Response
 * Product data as returned by the API
 */
export interface ProductResponse extends Product {
  shipping?: Shipping;
  installments?: Installments;
  reviews?: Reviews;
  originalPrice?: number;
}
