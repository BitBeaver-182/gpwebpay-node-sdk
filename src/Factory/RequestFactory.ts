import { PaymentConfigProvider } from "../Config/PaymentConfigProvider";
import { OperationInterface } from "../Data/OperationInterface";
import { Param } from "../Enum/Param";
import { LogicException } from "../Exceptions/LogicException";
import { Digest } from "../Param/Digest";
import { SignerProviderInterface } from "../Signer/SignerProviderInterface";
import { Request as DataRequest } from "../Data/Request";

export class RequestFactory {
  private readonly config: PaymentConfigProvider;
  private readonly signerProvider: SignerProviderInterface;

  constructor(
    config: PaymentConfigProvider,
    signerProvider: SignerProviderInterface
  ) {
    this.config = config;
    this.signerProvider = signerProvider;
  }

  /**
   * Creates a request object from an operation
   * 
   * @param operation The operation to create a request from
   * @throws InvalidArgumentException
   * @throws SignerException
   * @throws Error Unexpected value exception
   */
  public create(operation: OperationInterface): DataRequest {
    const key = this.config.getGateway(operation.getGateway());

    if (!operation.getParam(Param.RESPONSE_URL)) {
      const responseUrl = this.config.getResponseUrl();

      if (!responseUrl) {
        throw new LogicException('You forgot to set up the response URL');
      }

      operation.addParam(responseUrl);
    }

    const request = new DataRequest(
      operation,
      this.config.getMerchantNumber(key),
      this.config.getDepositFlag(key),
      this.config.getUrl(key)
    );

    const signer = this.signerProvider.get(key);
    const digestParams = request.getDigestParams();
    request.setParam(new Digest(signer.sign(digestParams)));
    request.sortParams();

    return request;
  }
}
