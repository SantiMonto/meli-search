/**
 * Mock configuration
 * Controls behavior of mock repository
 */
export const MOCK_CONFIG = {
  /**
   * Simulated network delay range (ms)
   */
  DELAY: {
    MIN: 200,
    MAX: 800,
  },

  /**
   * Error simulation
   */
  ERROR_SIMULATION: {
    ENABLED: false, // Set to true to randomly simulate errors
    PROBABILITY: 0.05, // 5% chance of error
  },

  /**
   * Search configuration
   */
  SEARCH: {
    /**
     * Minimum query length
     */
    MIN_QUERY_LENGTH: 1,

    /**
     * Default limit if not provided
     */
    DEFAULT_LIMIT: 10,

    /**
     * Maximum limit allowed
     */
    MAX_LIMIT: 50,

    /**
     * Enable fuzzy matching
     */
    FUZZY_MATCHING: true,
  },

  /**
   * Pagination
   */
  PAGINATION: {
    DEFAULT_OFFSET: 0,
  },
} as const;
