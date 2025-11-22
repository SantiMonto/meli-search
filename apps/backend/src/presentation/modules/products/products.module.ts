import { Module } from '@nestjs/common';
import { MockModule } from '../../../infrastructure/persistence/mock';
import { SearchProductsUseCase } from '../../../domain/use-cases/search-products/search-products.usecase';
import { GetProductDetailUseCase } from '../../../domain/use-cases/get-product-detail/get-product-detail.usecase';
import { ProductsController } from '../../controllers/products/products.controller';

/**
 * Products Module
 * Provides product-related functionality
 */
@Module({
  imports: [MockModule],
  controllers: [ProductsController],
  providers: [SearchProductsUseCase, GetProductDetailUseCase],
})
export class ProductsModule {}
