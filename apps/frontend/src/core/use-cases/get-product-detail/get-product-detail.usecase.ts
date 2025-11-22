import { IProductRepository } from '../../repositories/product.repository.interface';
import { Product } from '../../entities/product.entity';
import { ProductId } from '../../value-objects/product-id.vo';
import {
  GetProductDetailInput,
  ValidatedGetProductDetailInput,
} from './get-product-detail.input';

/**
 * Get Product Detail Use Case
 * Orchestrates the product detail retrieval logic
 */
export class GetProductDetailUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Execute the use case
   */
  async execute(input: GetProductDetailInput): Promise<Product> {
    const validatedInput = this.validate(input);

    return this.productRepository.getById(validatedInput.id.getValue());
  }

  /**
   * Validate and transform input
   */
  private validate(
    input: GetProductDetailInput,
  ): ValidatedGetProductDetailInput {
    const id = new ProductId(input.id);
    return { id };
  }
}
