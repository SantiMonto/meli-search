import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../repositories';
import { Product } from '../../entities';
import { ProductId } from '../../value-objects';
import { GetProductDetailDto } from './get-product-detail.dto';

/**
 * Get Product Detail Use Case
 * Handles product detail retrieval business logic
 */
@Injectable()
export class GetProductDetailUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Execute get product detail
   */
  async execute(dto: GetProductDetailDto): Promise<Product> {
    // Validate product ID format
    const productId = ProductId.from(dto.id);

    // Retrieve product through repository
    return await this.productRepository.findById(productId.getValue());
  }
}
