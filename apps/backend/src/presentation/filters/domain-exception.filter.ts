import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception';
import { InvalidSearchQueryException } from '../../domain/exceptions/invalid-search-query.exception';
import { ErrorResponseDto } from '../dto/responses/error.response.dto';
import { ErrorCode } from '@meli/shared-types';

/**
 * Domain Exception Filter
 * Catches domain exceptions and converts them to HTTP responses
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Map domain exceptions to HTTP status codes
    const statusCode = this.getHttpStatus(exception);

    const errorResponse: ErrorResponseDto = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
      error: exception.name,
      code: exception.code as ErrorCode,
    };

    this.logger.error(
      `Domain Exception: ${exception.name} - ${exception.message}`,
      exception.stack,
    );

    response.status(statusCode).json(errorResponse);
  }

  /**
   * Map domain exception to HTTP status code
   */
  private getHttpStatus(exception: DomainException): number {
    if (exception instanceof ProductNotFoundException) {
      return HttpStatus.NOT_FOUND;
    }

    if (exception instanceof InvalidSearchQueryException) {
      return HttpStatus.BAD_REQUEST;
    }

    // Default to 500 for unknown domain exceptions
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
