
import { ResponseInterface } from './Data/ResponseInterface';
import { GPWebPayException } from './Exceptions/GPWebPayException';

export type ResposeProviderErrorClosure = (exception: GPWebPayException, response: ResponseInterface) => void
export type ResposeProviderSuccessClosure = (response: ResponseInterface) => void

export interface ResponseProviderInterface {
  provide(response: ResponseInterface): ResponseInterface;

  /**
   * @throws {GPWebPayException}
   * @throws {GPWebPayResultException}
   */
  verifyPaymentResponse(response: ResponseInterface): boolean;

  /**
   * @param {ResposeProviderErrorClosure} closure signature: function(GPWebPayException $exception, ResponseInterface $response)
   */
  addOnError(closure: ResposeProviderErrorClosure): ResponseProviderInterface;

  /**
   * @param {ResposeProviderSuccessClosure} closure signature: function(ResponseInterface $response)
   */
  addOnSuccess(closure: ResposeProviderSuccessClosure): ResponseProviderInterface;
}