import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './presentation/modules/products/products.module';
import { HealthController } from './presentation/controllers/health/health.controller';
import { DomainExceptionFilter } from './presentation/filters/domain-exception.filter';
import { AllExceptionsFilter } from './presentation/filters/all-exceptions.filter';
import { LoggingInterceptor } from './presentation/interceptors/logging.interceptor';
import { TransformInterceptor } from './presentation/interceptors/transform.interceptor';

@Module({
  imports: [ProductsModule],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    // Global exception filters
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
