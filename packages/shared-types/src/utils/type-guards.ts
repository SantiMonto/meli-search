import { ProductCondition, Currency, ShippingMode, ErrorCode } from '../enums';

/**
 * Type Guards
 * Runtime type checking utilities
 */

export function isProductCondition(value: unknown): value is ProductCondition {
  return (
    typeof value === 'string' && Object.values(ProductCondition).includes(value as ProductCondition)
  );
}

export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && Object.values(Currency).includes(value as Currency);
}

export function isShippingMode(value: unknown): value is ShippingMode {
  return typeof value === 'string' && Object.values(ShippingMode).includes(value as ShippingMode);
}

export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === 'string' && Object.values(ErrorCode).includes(value as ErrorCode);
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
