import { VALIDATION_RULES } from '../constants';

/**
 * Validators
 * Validation utility functions
 */

/**
 * Validate product title
 */
export function isValidProductTitle(title: string): boolean {
  return (
    title.length >= VALIDATION_RULES.PRODUCT.TITLE_MIN_LENGTH &&
    title.length <= VALIDATION_RULES.PRODUCT.TITLE_MAX_LENGTH
  );
}

/**
 * Validate search query
 */
export function isValidSearchQuery(query: string): boolean {
  return (
    query.trim().length >= VALIDATION_RULES.SEARCH.QUERY_MIN_LENGTH &&
    query.length <= VALIDATION_RULES.SEARCH.QUERY_MAX_LENGTH
  );
}

/**
 * Validate price
 */
export function isValidPrice(price: number): boolean {
  return price >= VALIDATION_RULES.PRODUCT.PRICE_MIN && !isNaN(price) && isFinite(price);
}

/**
 * Validate pagination limit
 */
export function isValidLimit(limit: number): boolean {
  return Number.isInteger(limit) && limit > 0;
}

/**
 * Validate pagination offset
 */
export function isValidOffset(offset: number): boolean {
  return Number.isInteger(offset) && offset >= 0;
}
