
import { DepositFlag } from '../Param/DepositFlag';
import { MerchantNumber } from '../Param/MerchantNumber';
import { ResponseUrl } from '../Param/ResponseUrl';

export class PaymentConfig {
  constructor(
    private readonly url: string,
    private readonly merchantNumber: MerchantNumber,
    private readonly depositFlag: DepositFlag,
    private readonly gateway: string,
    private readonly responseUrl: ResponseUrl | null = null
  ) { }

  getUrl(): string {
    return this.url;
  }

  getMerchantNumber(): MerchantNumber {
    return this.merchantNumber;
  }

  getDepositFlag(): DepositFlag {
    return this.depositFlag;
  }

  getResponseUrl(): ResponseUrl | null {
    return this.responseUrl;
  }

  getGateway(): string {
    return this.gateway;
  }
}