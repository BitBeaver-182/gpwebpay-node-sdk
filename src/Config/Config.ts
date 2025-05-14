import { PaymentConfigProvider } from './PaymentConfigProvider';
import { SignerConfigProvider } from './SignerConfigProvider';

/**
 * This class represents the configuration for GPWebPay.
 * It holds providers for payment and signer configurations.
 */
export class Config {
  private paymentConfigProvider: PaymentConfigProvider;
  private signerConfigProvider: SignerConfigProvider;

  constructor(
    paymentConfigProvider: PaymentConfigProvider,
    signerConfigProvider: SignerConfigProvider
  ) {
    this.paymentConfigProvider = paymentConfigProvider;
    this.signerConfigProvider = signerConfigProvider;
  }

  getPaymentConfigProvider(): PaymentConfigProvider {
    return this.paymentConfigProvider;
  }

  getSignerConfigProvider(): SignerConfigProvider {
    return this.signerConfigProvider;
  }
}
