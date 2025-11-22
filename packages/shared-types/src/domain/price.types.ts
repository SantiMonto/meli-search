import { Currency } from '../enums';

/**
 * Price Information
 * Represents price details including discounts
 */
export interface Price {
  amount: number;
  currencyId: Currency;
  originalPrice?: number;
  discountPercentage?: number;
}
