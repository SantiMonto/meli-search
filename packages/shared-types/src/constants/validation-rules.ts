/**
 * Validation Rules
 * Common validation rules and constraints
 */
export const VALIDATION_RULES = {
  PRODUCT: {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    DESCRIPTION_MAX_LENGTH: 5000,
    PRICE_MIN: 0,
  },
  SEARCH: {
    QUERY_MIN_LENGTH: 1,
    QUERY_MAX_LENGTH: 100,
  },
} as const;
