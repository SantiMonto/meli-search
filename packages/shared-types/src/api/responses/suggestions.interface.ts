/**
 * Product Suggestion Interface
 * Lightweight product data for autocomplete suggestions
 */
export interface ProductSuggestion {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  currencyId: string;
}

/**
 * Suggestions Response Interface
 * Response format for product suggestions endpoint
 */
export interface SuggestionsResponse {
  query: string;
  suggestions: ProductSuggestion[];
}
