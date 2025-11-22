import { DomainException } from './domain.exception';

/**
 * Product Not Found Exception
 * Thrown when a requested product does not exist
 */
export class ProductNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Product with ID ${id} not found`);
    this.name = 'ProductNotFoundException';
  }
}
