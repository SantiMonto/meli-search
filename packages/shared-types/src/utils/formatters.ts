import { Currency } from '../enums';

/**
 * Formatters
 * Utility functions for formatting data
 */

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: Currency = Currency.ARS): string {
  const locale = currency === Currency.ARS ? 'es-AR' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format number with thousands separator
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-AR').format(value);
}

/**
 * Format discount percentage
 */
export function formatDiscountPercentage(percentage: number): string {
  return `${Math.round(percentage)}% OFF`;
}
