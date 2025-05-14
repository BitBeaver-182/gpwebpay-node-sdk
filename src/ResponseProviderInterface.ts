
import { ResponseInterface } from './Data/ResponseInterface';
import { GPWebPayException } from './Exceptions/GPWebPayException';
// import { GPWebPayResultException } from './Exceptions/GPWebPayResultException';

export interface ResponseProviderInterface {
  provide(response: ResponseInterface): ResponseInterface;

  /**
   * @throws {GPWebPayException}
   * @throws {GPWebPayResultException}
   */
  verifyPaymentResponse(response: ResponseInterface): boolean;

  /**
   * @param {(exception: GPWebPayException, response: ResponseInterface) => void} closure signature: function(GPWebPayException $exception, ResponseInterface $response)
   */
  addOnError(closure: (exception: GPWebPayException, response: ResponseInterface) => void): this;

  /**
   * @param {(response: ResponseInterface) => void} closure signature: function(ResponseInterface $response)
   */
  addOnSuccess(closure: (response: ResponseInterface) => void): this;
}