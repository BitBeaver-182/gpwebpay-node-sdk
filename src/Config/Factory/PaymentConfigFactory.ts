import { DepositFlag as DepositFlagEnum } from "../../Enum/DepositFlag";
import { DepositFlag } from "../../Param/DepositFlag";
import { MerchantNumber } from "../../Param/MerchantNumber";
import { ResponseUrl } from "../../Param/ResponseUrl";
import { PaymentConfig } from "../PaymentConfig";


export class PaymentConfigFactory {
  create(
    url: string,
    merchantNumber: string,
    depositFlag: DepositFlagEnum,
    gateway: string,
    responseUrl?: string | null
  ): PaymentConfig {
    const target = responseUrl && responseUrl !== '' ? new ResponseUrl(responseUrl) : null;

    return new PaymentConfig(
      url,
      new MerchantNumber(merchantNumber),
      new DepositFlag(depositFlag),
      gateway,
      target
    );
  }
}
