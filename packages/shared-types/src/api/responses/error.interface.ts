import { ErrorCode } from '../../enums';

/**
 * Error API Response
 * Standard error response format
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  code?: ErrorCode;
  timestamp?: string;
  path?: string;
}
