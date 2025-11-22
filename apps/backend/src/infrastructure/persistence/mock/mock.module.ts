import { Module } from '@nestjs/common';
import { MockDataService } from './services';
import { MockProductRepository } from './repositories';

/**
 * Mock Module
 * Provides mock implementations for testing and development
 */
@Module({
  providers: [
    MockDataService,
    {
      provide: 'IProductRepository',
      useClass: MockProductRepository,
    },
  ],
  exports: ['IProductRepository', MockDataService],
})
export class MockModule {}
