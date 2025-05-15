import { describe, expect, it } from "vitest";
import { DepositFlag } from "../Param/DepositFlag";
import { MerchantNumber } from "../Param/MerchantNumber";
import { ResponseUrl } from "../Param/ResponseUrl";
import { PaymentConfig } from "./PaymentConfig";
import { DepositFlag as DepositFlagEnum } from "../Enum/DepositFlag";

describe('PaymentConfig', () => {
  it('creates and exposes its values correctly', () => {
    const merchantNumber = new MerchantNumber('1234567890');
    const depositFlag = new DepositFlag(DepositFlagEnum.YES);
    const responseUrl = new ResponseUrl('http://example.com');

    const setting = new PaymentConfig(
      'http://localhost',
      merchantNumber,
      depositFlag,
      'czk',
      responseUrl
    );

    expect(setting.getUrl()).toBe('http://localhost');
    expect(setting.getMerchantNumber()).toBe(merchantNumber);
    expect(setting.getDepositFlag()).toBe(depositFlag);
    expect(setting.getGateway()).toBe('czk');
    expect(setting.getResponseUrl()).toBe(responseUrl);
  });
});
