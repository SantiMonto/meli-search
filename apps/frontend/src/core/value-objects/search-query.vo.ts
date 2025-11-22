import { VALIDATION_RULES } from '@meli/shared-types';

/**
 * SearchQuery Value Object (Frontend)
 * Ensures search query is always valid and sanitized
 */
export class SearchQuery {
  private readonly value: string;

  constructor(query: string) {
    this.validate(query);
    this.value = this.sanitize(query);
  }

  /**
   * Validate search query
   */
  private validate(query: string): void {
    if (!query || query.trim().length === 0) {
      throw new Error('Search query cannot be empty');
    }

    if (query.length < VALIDATION_RULES.SEARCH.QUERY_MIN_LENGTH) {
      throw new Error(
        `Search query must be at least ${VALIDATION_RULES.SEARCH.QUERY_MIN_LENGTH} character(s)`,
      );
    }

    if (query.length > VALIDATION_RULES.SEARCH.QUERY_MAX_LENGTH) {
      throw new Error(
        `Search query cannot exceed ${VALIDATION_RULES.SEARCH.QUERY_MAX_LENGTH} characters`,
      );
    }
  }

  /**
   * Sanitize search query
   */
  private sanitize(query: string): string {
    return query.trim().toLowerCase();
  }

  /**
   * Get the value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Get original (non-sanitized) value for display
   */
  getDisplayValue(): string {
    return this.value;
  }

  /**
   * Check equality
   */
  equals(other: SearchQuery): boolean {
    return this.value === other.value;
  }

  /**
   * Convert to string
   */
  toString(): string {
    return this.value;
  }

  /**
   * Create from string (factory method)
   */
  static from(query: string): SearchQuery {
    return new SearchQuery(query);
  }
}
