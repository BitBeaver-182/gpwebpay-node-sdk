import { describe, it, expect } from 'vitest';
import { PrivateKey } from '../../../src/Signer/Key/PrivateKey';
import { join } from 'path';

const certPath = join(__dirname, '../../../tests/_certs/test.pem');

describe('PrivateKey', () => {
  it('creates a private key successfully', () => {
    new PrivateKey(certPath, '1234567');
    // No assertions: just expect not to throw
  });

  it('returns same key object on repeated getKey() calls', () => {
    const privateKey = new PrivateKey(certPath, '1234567');

    const res1 = privateKey.getKey();
    const res2 = privateKey.getKey();

    expect(res1).toBe(res2); // should return cached object
  });

  it('throws on incorrect password', () => {
    const invalidPassword = 'wrongpass';

    const createWithWrongPass = () => {
      const key = new PrivateKey(certPath, invalidPassword);
      key.getKey(); // should throw
    };

    expect(createWithWrongPass).toThrowError(
      `"${certPath}" is not a valid PEM private key (or password is incorrect).`
    );
  });
});
