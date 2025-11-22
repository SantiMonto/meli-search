import { DomainException } from './domain.exception';

/**
 * Network Exception
 * Thrown when there is a network error or API failure
 */
export class NetworkException extends DomainException {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'NetworkException';
  }
}
