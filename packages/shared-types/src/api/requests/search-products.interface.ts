/**
 * Search Products Request
 * Query parameters for searching products
 */
export interface SearchProductsRequest {
  q: string; // Search query
  limit?: number; // Number of results per page
  offset?: number; // Offset for pagination
}
