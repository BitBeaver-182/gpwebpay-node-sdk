// tests/RequestFactory.test.ts
import { Currency as CurrencyEnum } from '@/Enum/Currency';

import { LogicException } from '@/Exceptions/LogicException';
import { AmountInPennies } from '@/Param/AmountInPennies';
import { OrderNumber } from '@/Param/OrderNumber';
import { SignerFactory } from '@/Signer/SignerFactory';
import { SignerProvider } from '@/Signer/SignerProvider';
import { describe, expect, it } from 'vitest';
import { RequestFactory } from './RequestFactory';
import { createConfig } from '@tests/helpers/config';
import { Currency } from '@/Param/Currency';
import { Operation } from '@/Data/Operation';
import { createOperation } from '@tests/helpers/data';

describe('RequestFactory', () => {
  const createFactory = (): RequestFactory => {
    const config = createConfig();
    const signerFactory = new SignerFactory();
    const signerProvider = new SignerProvider(signerFactory, config.getSignerConfigProvider());

    return new RequestFactory(config.getPaymentConfigProvider(), signerProvider);
  };

  it('should create a request with correct params', () => {
    const factory = createFactory();
    const operation = createOperation();
    const request = factory.create(operation);
    const params = request.getParams();

    expect(params['CURRENCY']).toBe('203');
    expect(params['ORDERNUMBER']).toBe('123456');
  });

  it('should generate correct request URL', () => {
    const factory = createFactory();
    const request = factory.create(createOperation());

    const expected =
      'https://test.3dsecure.gpwebpay.com/unicredit/order.do?MERCHANTNUMBER=123456789&OPERATION=CREATE_ORDER&ORDERNUMBER=123456&AMOUNT=100000&CURRENCY=203&DEPOSITFLAG=1&URL=http%3A%2F%2Ftest.com&MD=czk&DIGEST=F0F%2Bb%2FyUUGmyzs7rOMXKD06JJ8EJrdit2YT2JaotVM3BaPe2adSk2MR1pmEWBLstKTZu2W4QIdYIgV8W7sKQ8wA96fmzJaCXzk%2BUEGdy2cRGG7u0ghsmuEu%2FR%2FR%2BprjujZx7YoVSPn4g%2FXQ9yVK1Svz23SYKnTOwiBGHd1sb2EHAjoO02o22FlHRP8Z%2F41oABNZt%2BycM7xWX%2Fx3YL01zGY99Mf2ulfe2UYaZ2nJtPa3FHuMPNJGfLPSFvTiIeEGCJ2%2BIkBqc5oTX0MjM8q2BojwSb%2BW%2Fev7N4fusQM%2BV2UjNZrXeMHfJGJkDE3VwNAY0AKaK%2Bcu6NDxHYsNswjyaWg%3D%3D';

    expect(request.getRequestUrl()).toBe(expected);
  });

  it('should throw LogicException when response URL is not set', () => {
    const factory = createFactory();

    const operation = new Operation(
      new OrderNumber('1234'),
      new AmountInPennies(100000),
      new Currency(CurrencyEnum.CZK)
    );

    expect(() => factory.create(operation)).toThrow(LogicException);
    expect(() => factory.create(operation)).toThrow('You forgot to set up the response URL');
  });
});
