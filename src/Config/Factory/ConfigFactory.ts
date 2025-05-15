import { Config } from '../Config';
import { PaymentConfigFactory } from './PaymentConfigFactory';
import { PaymentConfigProvider } from '../PaymentConfigProvider';
import { SignerConfigProvider } from '../SignerConfigProvider';
import { SignerConfig } from '../SignerConfig';
import { InvalidArgumentException } from '../../Exceptions/InvalidArgumentException';
import { ConfigParams, GatewayConfig } from './ConfigFactoryInteface';

export class ConfigFactory {
  static readonly PRIVATE_KEY = 'PRIVATE_KEY';
  static readonly PRIVATE_KEY_PASSPHRASE = 'PRIVATE_KEY_PASSPHRASE';
  static readonly PUBLIC_KEY = 'PUBLIC_KEY';
  static readonly URL = 'URL';
  static readonly MERCHANT_NUMBER = 'MERCHANT_NUMBER';
  static readonly DEPOSIT_FLAG = 'DEPOSIT_FLAG';
  static readonly RESPONSE_URL = 'RESPONSE_URL';

  private paymentConfigFactory: PaymentConfigFactory;

  constructor(paymentConfigFactory: PaymentConfigFactory) {
    this.paymentConfigFactory = paymentConfigFactory;
  }

  public create(params: ConfigParams, defaultGateway: string = 'default'): Config {
    const data = this.normalizeParams(params, defaultGateway);
    const config = this.createConfig(defaultGateway);
    this.processParams(data, config);
    return config;
  }

  private normalizeParams(params: ConfigParams, defaultGateway: string): Record<string, GatewayConfig> {
    const gateway = defaultGateway.toLowerCase();

    if (ConfigFactory.PRIVATE_KEY in params) {
      // Single gateway config passed
      return {
        [gateway]: params,
      } as Record<string, GatewayConfig>;
    }

    if (!(gateway in params)) {
      throw new InvalidArgumentException(
        `The key for defaultGateway: "${gateway}" is not included in the configuration parameters. Keys in the parameters: ${Object.keys(params).join(', ')}`
      );
    }

    return params;
  }

  private createConfig(defaultGateway: string): Config {
    const paymentConfigProvider = new PaymentConfigProvider(defaultGateway);
    const signerConfigProvider = new SignerConfigProvider();
    signerConfigProvider.setDefaultGateway(defaultGateway);

    return new Config(paymentConfigProvider, signerConfigProvider);
  }

  private processParams(params: Record<string, GatewayConfig>, config: Config): void {
    const paymentConfigProvider = config.getPaymentConfigProvider();
    const signerConfigProvider = config.getSignerConfigProvider();


    for (const [gateway, data] of Object.entries(params)) {
      paymentConfigProvider.addPaymentConfig(
        this.paymentConfigFactory.create(
          data.URL,
          data.MERCHANT_NUMBER,
          data.DEPOSIT_FLAG,
          gateway,
          data.RESPONSE_URL ?? ''
        )
      );

      signerConfigProvider.addConfig(
        new SignerConfig(
          data.PRIVATE_KEY,
          data.PRIVATE_KEY_PASSPHRASE,
          data.PUBLIC_KEY
        ),
        gateway
      );
    }
  }
}
