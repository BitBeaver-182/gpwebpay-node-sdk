import { describe, it, expect } from "vitest";
import { InvalidArgumentException } from "../../Exceptions/InvalidArgumentException";
import { ConfigFactory } from "./ConfigFactory";
import { PaymentConfigFactory } from "./PaymentConfigFactory";

const CZK = 'czk';
const EUR = 'eur';

const CERTS_PATH = `${__dirname}/_certs`;

describe('ConfigFactory', () => {
  const factory = new ConfigFactory(new PaymentConfigFactory());

  it('creates config from single set of parameters', () => {
    const config = factory.create({
      PRIVATE_KEY: `${CERTS_PATH}/test.pem`,
      PRIVATE_KEY_PASSPHRASE: '1234567',
      PUBLIC_KEY: `${CERTS_PATH}/test-pub.pem`,
      URL: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
      MERCHANT_NUMBER: '123456789',
      DEPOSIT_FLAG: 1,
    });

    const configProvider = config.getPaymentConfigProvider();

    expect(configProvider.getUrl()).toBe('https://test.3dsecure.gpwebpay.com/unicredit/order.do');
    expect(configProvider.getMerchantNumber()).toBe('123456789');
    expect(configProvider.getDepositFlag()).toBe('1');

    const signerConfig = config.getSignerConfigProvider().getConfig();
    expect(signerConfig.getPrivateKey()).toBe(`${CERTS_PATH}/test.pem`);
    expect(signerConfig.getPrivateKeyPassword()).toBe('1234567');
    expect(signerConfig.getPublicKey()).toBe(`${CERTS_PATH}/test-pub.pem`);
  });

  it('creates config from multiple gateways', () => {
    const config = factory.create({
      czk: {
        PRIVATE_KEY: `${CERTS_PATH}/test.pem`,
        PRIVATE_KEY_PASSPHRASE: '1234567',
        PUBLIC_KEY: `${CERTS_PATH}/test-pub.pem`,
        URL: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
        MERCHANT_NUMBER: '123456789',
        DEPOSIT_FLAG: 1,
      },
      eur: {
        PRIVATE_KEY: `${CERTS_PATH}/test2.pem`,
        PRIVATE_KEY_PASSPHRASE: '12345678',
        PUBLIC_KEY: `${CERTS_PATH}/test-pub2.pem`,
        URL: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
        MERCHANT_NUMBER: '123456780',
        DEPOSIT_FLAG: 0,
      },
    }, CZK);

    const provider = config.getPaymentConfigProvider();

    // defaults
    expect(provider.getUrl()).toBe('https://test.3dsecure.gpwebpay.com/unicredit/order.do');
    expect(provider.getMerchantNumber()).toBe('123456789');
    expect(provider.getDepositFlag()).toBe('1');

    // czk
    expect(provider.getUrl(CZK)).toBe('https://test.3dsecure.gpwebpay.com/unicredit/order.do');
    expect(provider.getMerchantNumber(CZK)).toBe('123456789');
    expect(provider.getDepositFlag(CZK)).toBe('1');

    // eur
    expect(provider.getUrl(EUR)).toBe('https://test.3dsecure.gpwebpay.com/unicredit/order.do');
    expect(provider.getMerchantNumber(EUR)).toBe('123456780');
    expect(provider.getDepositFlag(EUR)).toBe('0');

    const signerDefault = config.getSignerConfigProvider().getConfig();
    expect(signerDefault.getPrivateKey()).toBe(`${CERTS_PATH}/test.pem`);
    expect(signerDefault.getPrivateKeyPassword()).toBe('1234567');
    expect(signerDefault.getPublicKey()).toBe(`${CERTS_PATH}/test-pub.pem`);

    const signerCzk = config.getSignerConfigProvider().getConfig(CZK);
    expect(signerCzk.getPrivateKey()).toBe(`${CERTS_PATH}/test.pem`);
    expect(signerCzk.getPrivateKeyPassword()).toBe('1234567');
    expect(signerCzk.getPublicKey()).toBe(`${CERTS_PATH}/test-pub.pem`);

    const signerEur = config.getSignerConfigProvider().getConfig(EUR);
    expect(signerEur.getPrivateKey()).toBe(`${CERTS_PATH}/test2.pem`);
    expect(signerEur.getPrivateKeyPassword()).toBe('12345678');
    expect(signerEur.getPublicKey()).toBe(`${CERTS_PATH}/test-pub2.pem`);
  });

  it('throws if default gateway is missing from config', () => {
    expect(() => {
      factory.create({
        czk: {
          PRIVATE_KEY: `${CERTS_PATH}/test.pem`,
          PRIVATE_KEY_PASSPHRASE: '1234567',
          PUBLIC_KEY: `${CERTS_PATH}/test-pub.pem`,
          URL: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
          MERCHANT_NUMBER: '123456789',
          DEPOSIT_FLAG: 1,
        },
        eur: {
          PRIVATE_KEY: `${CERTS_PATH}/test2.pem`,
          PRIVATE_KEY_PASSPHRASE: '12345678',
          PUBLIC_KEY: `${CERTS_PATH}/test-pub2.pem`,
          URL: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
          MERCHANT_NUMBER: '123456780',
          DEPOSIT_FLAG: 0,
        },
      }, 'wrong_default_gateway');
    }).toThrow(InvalidArgumentException);
  });
});
