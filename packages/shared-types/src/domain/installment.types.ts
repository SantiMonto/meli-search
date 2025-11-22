import { Currency } from '../enums';

/**
 * Installment Information
 * Represents installment payment options
 */
export interface Installment {
  quantity: number;
  amount: number;
  rate: number;
  currencyId: Currency;
}

/**
 * Installments
 * Represents available installment options
 */
export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currencyId: Currency;
}
