/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

/**
 * Get API base URL from environment
 */
export const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    // Fallback for development if env var is missing, but warn
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'NEXT_PUBLIC_API_URL is not defined, using default http://localhost:3000',
      );
      return 'http://localhost:3000';
    }
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
  }

  return url;
};

/**
 * API endpoints configuration
 */
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    PRODUCTS: {
      SEARCH: '/api/v1/products/search',
      DETAIL: (id: string) => `/api/v1/products/${id}`,
    },
    HEALTH: '/api/v1/health',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

/**
 * Request configuration
 */
export const REQUEST_CONFIG = {
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;
