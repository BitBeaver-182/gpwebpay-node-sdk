import { PaymentConfigProvider } from './Config/PaymentConfigProvider';
import { ResponseInterface } from './Data/ResponseInterface';
import { Param } from './Enum/Param';
import { GPWebPayException } from './Exceptions/GPWebPayException';
import { GPWebPayResultException } from './Exceptions/GPWebPayResultException';
import { SignerException } from './Exceptions/SignerException';
import { ResponseProviderInterface, ResposeProviderErrorClosure, ResposeProviderSuccessClosure } from './ResponseProviderInterface';
import { SignerProviderInterface } from './Signer/SignerProviderInterface';


export class ResponseProvider implements ResponseProviderInterface {
  private onSuccess: ResposeProviderSuccessClosure[] = [];
  private onError: ResposeProviderErrorClosure[] = [];

  constructor(
    private readonly configProvider: PaymentConfigProvider,
    private readonly signerProvider: SignerProviderInterface
  ) { }

  public provide(response: ResponseInterface): ResponseInterface {


    try {
      if (!this.verifyPaymentResponse(response)) {
        throw new SignerException('Digest or Digest1 is incorrect!');
      }

      // verify PRCODE and SRCODE
      if (response.hasError()) {

        throw new GPWebPayResultException(
          'Response has an error.',
          response.getPrcode(),
          response.getSrcode(),
          response.getResultText()
        );
      }

      this.onSuccessHandler(response);
    } catch (exception) {
      if (exception instanceof GPWebPayResultException) {
        this.onErrorHandler(exception, response);
      } else {
        throw exception;
      }
    }

    return response;
  }

  public verifyPaymentResponse(response: ResponseInterface): boolean {
    // verify digest & digest1
    const signer = this.signerProvider.get(response.getGatewayKey());

    const params = response.getParams();
    const verify = signer.verify(params, response.getDigest());
    params[Param.MERCHANTNUMBER] = this.configProvider.getMerchantNumber(response.getGatewayKey());
    const verify1 = signer.verify(params, response.getDigest1());

    return !(false === verify || false === verify1);
  }

  public addOnSuccess(closure: ResposeProviderSuccessClosure): ResponseProviderInterface {
    this.onSuccess.push(closure);
    return this;
  }

  public addOnError(closure: ResposeProviderErrorClosure): ResponseProviderInterface {
    this.onError.push(closure);
    return this;
  }

  private onSuccessHandler(response: ResponseInterface): void { // Changed to onSuccessHandler
    this.onSuccess.forEach(callback => {
      callback(response);
    });
  }

  private onErrorHandler(exception: GPWebPayException, response: ResponseInterface): void {
    if (this.onError.length === 0) {
      throw exception;
    }

    this.onError.forEach(callback => {
      callback(exception, response);
    });
  }
}
