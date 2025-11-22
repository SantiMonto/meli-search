import { Injectable, Logger } from '@nestjs/common';
import { searchIphoneData, productsDetailData } from '../data';

interface SearchResultData {
  query: string;
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
  results: any[];
}

/**
 * Mock Data Service
 * Handles loading and querying mock data
 */
@Injectable()
export class MockDataService {
  private readonly logger = new Logger(MockDataService.name);

  // In-memory data store
  private searchData: Map<string, SearchResultData> = new Map();
  private detailData: Map<string, any> = new Map();

  constructor() {
    this.loadMockData();
  }

  /**
   * Load mock data into memory
   */
  private loadMockData(): void {
    this.logger.log('Loading mock data...');

    // Load search data
    this.searchData.set('iphone', searchIphoneData as SearchResultData);

    // Load detail data
    const details = productsDetailData as Record<string, any>;
    Object.entries(details).forEach(([id, detail]) => {
      this.detailData.set(id, detail);
    });

    this.logger.log(
      `Loaded ${this.searchData.size} search datasets and ${this.detailData.size} product details`,
    );
  }

  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Results per page
   * @param offset - Pagination offset
   * @returns Search results with pagination
   */
  search(query: string, limit: number, offset: number): SearchResultData {
    const normalizedQuery = query.toLowerCase().trim();

    // Try exact match first
    let searchResult = this.searchData.get(normalizedQuery);

    // If no exact match, try fuzzy matching
    if (!searchResult) {
      searchResult = this.fuzzySearch(normalizedQuery);
    }

    // If still no results, return empty
    if (!searchResult) {
      return {
        query,
        results: [],
        paging: {
          total: 0,
          offset: 0,
          limit,
        },
      };
    }

    // Apply pagination
    const paginatedResults = this.paginateResults(
      searchResult.results,
      limit,
      offset,
    );

    return {
      query,
      results: paginatedResults,
      paging: {
        total: searchResult.results.length,
        offset,
        limit,
      },
    };
  }

  /**
   * Fuzzy search across all datasets
   * @param query - Search term
   * @returns First matching dataset or null
   */
  private fuzzySearch(query: string): SearchResultData | null {
    for (const [key, data] of this.searchData.entries()) {
      if (key.includes(query) || query.includes(key)) {
        return data;
      }

      // Check if any product title matches
      const hasMatch = data.results.some((product: any) =>
        product.title.toLowerCase().includes(query),
      );

      if (hasMatch) {
        // Filter results to only matching products
        return {
          ...data,
          results: data.results.filter((product: any) =>
            product.title.toLowerCase().includes(query),
          ),
        };
      }
    }

    return null;
  }

  /**
   * Paginate results
   * @param results - All results
   * @param limit - Results per page
   * @param offset - Pagination offset
   * @returns Paginated results
   */
  private paginateResults(
    results: any[],
    limit: number,
    offset: number,
  ): any[] {
    return results.slice(offset, offset + limit);
  }

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product detail or null
   */
  findById(id: string): any | null {
    return this.detailData.get(id) || null;
  }
}
