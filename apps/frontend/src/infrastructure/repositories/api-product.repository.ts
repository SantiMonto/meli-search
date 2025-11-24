import { IProductRepository } from '../../core/repositories/product.repository.interface';
import { Product } from '../../core/entities/product.entity';
import { SearchResult } from '../../core/entities/search-result.entity';
import { ProductNotFoundException } from '../../core/exceptions/product-not-found.exception';
import { NetworkException } from '../../core/exceptions/network.exception';
import {
  HttpClient,
  httpClient as defaultHttpClient,
} from '../http/http-client';
import { HttpError, NetworkError } from '../http/http-error';
import { API_CONFIG } from '../config/api.config';
import { SearchResultResponse, ProductResponse } from '@meli/shared-types';

/**
 * API Product Repository
 * Implements IProductRepository using HTTP API
 */
export class ApiProductRepository implements IProductRepository {
  constructor(private readonly httpClient: HttpClient = defaultHttpClient) {}

  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Maximum number of results
   * @param offset - Pagination offset
   * @returns SearchResult with products and pagination
   * @throws NetworkException if request fails
   */
  async search(
    query: string,
    limit: number,
    offset: number,
  ): Promise<SearchResult> {
    try {
      const response = await this.httpClient.get<SearchResultResponse>(
        API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH,
        { q: query, limit, offset },
      );

      // Transform API response to domain entity
      return SearchResult.fromResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get product suggestions for autocomplete
   * @param query - Search term
   * @param limit - Maximum number of suggestions
   * @returns Array of products for suggestions
   * @throws NetworkException if request fails
   */
  async getSuggestions(query: string, limit: number = 6): Promise<Product[]> {
    try {
      const response = await this.httpClient.get<ProductResponse[]>(
        API_CONFIG.ENDPOINTS.PRODUCTS.SUGGESTIONS,
        { q: query, limit },
      );

      // Transform API response to domain entities
      // Suggestions endpoint returns array directly, not wrapped in results
      return response.map((item) => Product.fromListItem(item));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product entity
   * @throws ProductNotFoundException if product not found
   * @throws NetworkException if request fails
   */
  async getById(id: string): Promise<Product> {
    try {
      const response = await this.httpClient.get<ProductResponse>(
        API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL(id),
      );

      // Transform API response to domain entity
      return Product.fromDetail(response);
    } catch (error) {
      // Handle 404 specifically
      if (error instanceof HttpError && error.isNotFound()) {
        throw new ProductNotFoundException(id);
      }

      this.handleError(error);
    }
  }

  /**
   * Handle errors and convert to domain exceptions
   */
  private handleError(error: unknown): never {
    if (error instanceof NetworkError) {
      throw new NetworkException(
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      );
    }

    if (error instanceof HttpError) {
      if (error.isServerError()) {
        throw new NetworkException(
          'Error del servidor. Por favor, intenta más tarde.',
          error.statusCode,
        );
      }

      throw new NetworkException(
        error.message || 'Error al realizar la solicitud',
        error.statusCode,
      );
    }

    // Unknown error
    throw new NetworkException(
      error instanceof Error
        ? error.message
        : 'Error desconocido al realizar la solicitud',
    );
  }
}

/**
 * Default API product repository instance
 */
export const apiProductRepository = new ApiProductRepository();
