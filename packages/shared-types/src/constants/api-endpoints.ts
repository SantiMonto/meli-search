/**
 * API Endpoints
 * Centralized API endpoint definitions
 */
export const API_ENDPOINTS = {
  PRODUCTS: {
    SEARCH: '/api/v1/products/search',
    DETAIL: (id: string) => `/api/v1/products/${id}`,
  },
} as const;

/**
 * API Base Path
 */
export const API_BASE_PATH = '/api/v1';
