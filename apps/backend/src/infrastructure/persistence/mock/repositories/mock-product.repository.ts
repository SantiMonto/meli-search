import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../../domain/repositories';
import { Product, SearchResult, Paging } from '../../../../domain/entities';
import { ProductNotFoundException } from '../../../../domain/exceptions';
import { MockDataService } from '../services';
import { MOCK_CONFIG } from '../../../config';
import { Currency, ProductCondition } from '@meli/shared-types';

interface ProductListItemData {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  condition: string;
  thumbnail?: string;
  installments?: {
    quantity: number;
    amount: number;
    rate?: number;
    currency_id?: string;
  };
  shipping?: {
    free_shipping: boolean;
    mode?: string;
    logistic_type?: string;
    store_pick_up?: boolean;
  };
  reviews?: {
    rating_average: number;
    total: number;
  };
}

interface ProductDetailData extends ProductListItemData {
  original_price?: number;
  available_quantity?: number;
  sold_quantity?: number;
  permalink?: string;
  pictures?: Array<{ id: string; url: string }>;
  seller_address?: {
    city?: { name: string };
    state?: { name: string };
  };
  attributes?: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
  warranty?: string;
  description?: string;
}

/**
 * Mock Product Repository
 * Implements IProductRepository using mock data
 */
@Injectable()
export class MockProductRepository implements IProductRepository {
  constructor(private readonly mockDataService: MockDataService) {}

  /**
   * Search products by query
   */
  async search(
    query: string,
    limit: number,
    offset: number,
  ): Promise<SearchResult> {
    // Simulate network delay
    await this.simulateDelay();

    // Get data from service
    const data = this.mockDataService.search(query, limit, offset);

    // Convert to domain entities
    const products = data.results.map((item) => this.mapToProduct(item));
    const paging = new Paging(
      data.paging.total,
      data.paging.offset,
      data.paging.limit,
    );

    return new SearchResult(query, products, paging);
  }

  /**
   * Find product by ID
   */
  async findById(id: string): Promise<Product> {
    // Simulate network delay
    await this.simulateDelay();

    // Get data from service
    const data = this.mockDataService.findById(id);

    if (!data) {
      throw new ProductNotFoundException(id);
    }

    // Convert to domain entity
    return this.mapToProductDetail(data);
  }

  /**
   * Simulate network delay
   */
  private async simulateDelay(): Promise<void> {
    const delay =
      Math.random() * (MOCK_CONFIG.DELAY.MAX - MOCK_CONFIG.DELAY.MIN) +
      MOCK_CONFIG.DELAY.MIN;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Map API data to Product entity (list item)
   */
  private mapToProduct(data: ProductListItemData): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currency_id as Currency,
      data.condition as ProductCondition,
      data.thumbnail,
      undefined, // No originalPrice in list
      undefined, // No availableQuantity in list
      undefined, // No soldQuantity in list
      undefined, // No permalink in list
      undefined, // No pictures in list
      data.installments
        ? {
            quantity: data.installments.quantity,
            amount: data.installments.amount,
            rate: data.installments.rate,
            currencyId: data.installments.currency_id as Currency,
          }
        : undefined,
      data.shipping
        ? {
            freeShipping: data.shipping.free_shipping,
            mode: data.shipping.mode,
            logisticType: data.shipping.logistic_type,
            storePickUp: data.shipping.store_pick_up,
          }
        : undefined,
      undefined, // No sellerAddress in list
      undefined, // No attributes in list
      undefined, // No warranty in list
      undefined, // No description in list
      data.reviews
        ? {
            ratingAverage: data.reviews.rating_average,
            total: data.reviews.total,
          }
        : undefined,
    );
  }

  /**
   * Map API data to Product entity (detail)
   */
  private mapToProductDetail(data: ProductDetailData): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currency_id as Currency,
      data.condition as ProductCondition,
      data.pictures?.[0]?.url, // Use first picture as thumbnail
      data.original_price,
      data.available_quantity,
      data.sold_quantity,
      data.permalink,
      data.pictures?.map((p) => ({ id: p.id, url: p.url })),
      data.installments
        ? {
            quantity: data.installments.quantity,
            amount: data.installments.amount,
            rate: data.installments.rate,
            currencyId: data.installments.currency_id as Currency,
          }
        : undefined,
      data.shipping
        ? {
            freeShipping: data.shipping.free_shipping,
            mode: data.shipping.mode,
            logisticType: data.shipping.logistic_type,
            storePickUp: data.shipping.store_pick_up,
          }
        : undefined,
      data.seller_address,
      data.attributes?.map((a) => ({
        id: a.id,
        name: a.name,
        valueName: a.value_name,
      })),
      data.warranty,
      data.description,
      data.reviews
        ? {
            ratingAverage: data.reviews.rating_average,
            total: data.reviews.total,
          }
        : undefined,
    );
  }
}
