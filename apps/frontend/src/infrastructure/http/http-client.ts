import { API_CONFIG, REQUEST_CONFIG } from '../config/api.config';
import { HttpError, NetworkError, TimeoutError } from './http-error';

/**
 * HTTP Client options
 */
export interface HttpClientOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP Client
 * Wrapper around fetch API with error handling and interceptors
 */
export class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(
    baseUrl: string = API_CONFIG.BASE_URL,
    options: HttpClientOptions = {},
  ) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = options.timeout || API_CONFIG.TIMEOUT;
    this.defaultHeaders = {
      ...REQUEST_CONFIG.HEADERS,
      ...options.headers,
    };
  }

  /**
   * Perform GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>(url, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Perform POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: HttpClientOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Perform PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: HttpClientOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(endpoint: string, options?: HttpClientOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'DELETE',
      ...options,
    });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number>,
  ): string {
    // Handle absolute URLs or relative paths
    const url = endpoint.startsWith('http')
      ? new URL(endpoint)
      : new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Perform HTTP request with timeout and error handling
   */
  private async request<T>(
    url: string,
    options: RequestInit & HttpClientOptions = {},
  ): Promise<T> {
    const { timeout = this.defaultTimeout, headers, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[HTTP] ${fetchOptions.method || 'GET'} ${url}`, {
          status: response.status,
        });
      }

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Parse JSON response
      // Some endpoints might return empty body (204)
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new TimeoutError(`Request timeout after ${timeout}ms`);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new NetworkError(
          'Network request failed. Please check your connection.',
        );
      }

      // Re-throw HttpError
      if (error instanceof HttpError) {
        throw error;
      }

      // Unknown error
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error occurred',
      );
    }
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: unknown;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const message =
      typeof errorData === 'object' &&
      errorData !== null &&
      'message' in errorData
        ? (errorData as { message: string }).message
        : `HTTP Error ${response.status}`;

    throw new HttpError(message, response.status, errorData);
  }
}

/**
 * Default HTTP client instance
 */
export const httpClient = new HttpClient();
