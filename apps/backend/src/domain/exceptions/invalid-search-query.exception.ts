import { DomainException } from './domain.exception';

/**
 * Exception thrown when search query is invalid
 */
export class InvalidSearchQueryException extends DomainException {
  constructor(reason: string) {
    super(`Invalid search query: ${reason}`, 'INVALID_SEARCH_QUERY');
  }
}
