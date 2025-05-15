import { PaymentConfig } from './PaymentConfig';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { MerchantNumber } from '../Param/MerchantNumber';
import { ResponseUrl } from '../Param/ResponseUrl';
import { DepositFlag } from '../Param/DepositFlag';

export class PaymentConfigProvider {
  /**
   * @var string defaultGatewayKey
   */
  private defaultGateway: string;
  /**
   * @var Record<string, PaymentConfig>
   */
  private paymentConfigs: Record<string, PaymentConfig> = {};

  constructor(defaultGateway: string = 'default') {
    this.defaultGateway = defaultGateway;
  }

  addPaymentConfig(paymentConfig: PaymentConfig): void {
    this.paymentConfigs[paymentConfig.getGateway()] = paymentConfig;
  }

  getUrl(gateway: string | null = null): string {
    return this.paymentConfigs[this.getGateway(gateway)].getUrl();
  }

  getMerchantNumber(gateway: string | null = null): string {
    return this.paymentConfigs[this.getGateway(gateway)].getMerchantNumber().toString();
  }

  getDepositFlag(gateway: string | null = null): string {
    return this.paymentConfigs[this.getGateway(gateway)].getDepositFlag().toString();
  }

  getDefaultGateway(): string {
    return this.defaultGateway;
  }

  setDefaultGateway(gateway: string): void {
    this.defaultGateway = gateway;
  }

  getGateway(gateway: string | null = null): string {
    if (gateway === null) {
      gateway = this.getDefaultGateway();
    }

    if (!this.paymentConfigs.hasOwnProperty(gateway)) {
      throw new InvalidArgumentException(
        `Config for key: "${gateway}" not exist. Possible keys are: "${Object.keys(this.paymentConfigs).join(', ')}"`
      );
    }

    return gateway;
  }

  getResponseUrl(gateway: string | null = null): ResponseUrl | null {
    return this.paymentConfigs[this.getGateway(gateway)]?.getResponseUrl() ?? null;
  }
}