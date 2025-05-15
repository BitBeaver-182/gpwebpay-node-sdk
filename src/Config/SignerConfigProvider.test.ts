import { describe, it, expect } from 'vitest';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { SignerConfig } from './SignerConfig';
import { SignerConfigProvider } from './SignerConfigProvider';
import path from 'path';

describe('SignerConfigProvider', () => {
  const testCertPath = path.resolve(__dirname, 'tests/_certs/test.pem');
  const testPubPath = path.resolve(__dirname, 'tests/_certs/test-pub.pem');

  it('should add and retrieve config correctly', () => {
    const provider = new SignerConfigProvider();
    const config = new SignerConfig(testCertPath, '1234567', testPubPath);

    provider.addConfig(config, 'czk');
    provider.setDefaultGateway('czk');

    expect(provider.getConfig('czk')).toBe(config);
    expect(provider.getConfig()).toBe(config);
  });

  it('should add default config and retrieve it without specifying gateway', () => {
    const provider = new SignerConfigProvider();
    const config = new SignerConfig(testCertPath, '1234567', testPubPath);

    provider.addConfig(config, provider.getDefaultGateway());

    expect(provider.getConfig()).toBe(config);
  });

  it('should throw if config is missing for given gateway', () => {
    const provider = new SignerConfigProvider();

    expect(() => provider.getConfig('czk')).toThrowError(
      new InvalidArgumentException(
        'Config for gateway "czk" does not exist. You are probably forgot added or you wrong set default config.'
      )
    );
  });
});
