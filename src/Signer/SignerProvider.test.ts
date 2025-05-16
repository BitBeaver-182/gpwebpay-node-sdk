import { describe, it, expect } from 'vitest';
import { SignerFactory } from './SignerFactory';
import { SignerProvider } from './SignerProvider';
import { ConfigFactory } from '@/Config/Factory/ConfigFactory';
import { PaymentConfigFactory } from '@/Config/Factory/PaymentConfigFactory';
import path from 'path';

const DEFAULT_GATEWAY = 'czk';

const createConfig = () => {
  const factory = new ConfigFactory(new PaymentConfigFactory());
  return factory.create({
    'czk': {
      [ConfigFactory.PRIVATE_KEY]: path.join(__dirname, '../../tests/_certs/test.pem'),
      [ConfigFactory.PRIVATE_KEY_PASSPHRASE]: '1234567',
      [ConfigFactory.PUBLIC_KEY]: path.join(__dirname, '../../tests/_certs/test-pub.pem'),
      [ConfigFactory.URL]: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
      [ConfigFactory.MERCHANT_NUMBER]: '123456789',
      [ConfigFactory.DEPOSIT_FLAG]: 1,
    },
    'eur': {
      [ConfigFactory.PRIVATE_KEY]: path.join(__dirname, '../../tests/_certs/test2.pem'),
      [ConfigFactory.PRIVATE_KEY_PASSPHRASE]: '12345678',
      [ConfigFactory.PUBLIC_KEY]: path.join(__dirname, '../../tests/_certs/test-pub2.pem'),
      [ConfigFactory.URL]: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
      [ConfigFactory.MERCHANT_NUMBER]: '123456780',
      [ConfigFactory.DEPOSIT_FLAG]: 1,
    }
  }, DEFAULT_GATEWAY)
}

describe('SignerProvider', () => {

  it('should return default provider if no params pass', () => {
    const config = createConfig().getSignerConfigProvider();
    const provider = new SignerProvider(new SignerFactory(), config);

    const signerNoParams = provider.get();
    const signerDefault = provider.get(DEFAULT_GATEWAY);


    expect(signerNoParams).toBe(signerDefault);
  });

  it('creates different signers for different currencies', () => {
    const config = createConfig().getSignerConfigProvider();
    const provider = new SignerProvider(new SignerFactory(), config);

    const signerCzk = provider.get('czk');
    const signerEur = provider.get('eur');

    expect(signerCzk).not.toBe(signerEur);
  });

  it('reuses the same signer for the same currency', () => {
    const config = createConfig().getSignerConfigProvider();
    const provider = new SignerProvider(new SignerFactory(), config);

    const signer1 = provider.get('czk');
    const signer2 = provider.get('czk');

    expect(signer1).toBe(signer2);
  });
});
