import { ProductId } from '../../value-objects/product-id.vo';

/**
 * Input for GetProductDetailUseCase
 */
export interface GetProductDetailInput {
  id: string;
}

/**
 * Validated input for GetProductDetailUseCase
 */
export interface ValidatedGetProductDetailInput {
  id: ProductId;
}
