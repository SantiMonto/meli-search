/**
 * Error Code Enum
 * Represents different error codes that can occur in the application
 */
export enum ErrorCode {
  // General errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_PARAMETER = 'INVALID_PARAMETER',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}
