import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import { PrivateKey } from './Key/PrivateKey';
import { PublicKey } from './Key/PublicKey';
import { Signer } from './Signer';
import { SignerException } from '@/Exceptions/SignerException';
import { KeyObject } from 'crypto';

const privateKeyPath = path.join(__dirname, '../../tests/_certs/test.pem');
const publicKeyPath = path.join(__dirname, '../../tests/_certs/test-pub.pem');

const params = {
  MERCHANTNUMBER: '123456789',
  DEPOSITFLAG: '1',
  OPERATION: 'CREATE_ORDER',
  AMOUNT: '100000',
  ORDERNUMBER: '123456',
  CURRENCY: '203',
  MD: 'czk',
  URL: 'http://test.com',
};

describe('Signer', () => {
  it('signs data correctly', () => {
    const signer = new Signer(
      new PrivateKey(privateKeyPath, '1234567'),
      new PublicKey(publicKeyPath)
    );

    const hash = signer.sign(params);

    expect(hash).toBe(
      'kMl9tg/up2z9CJu+Ebgm7mg3XSGOAvY2ZkrtgqOtzSprh1L22bvshGRlfDT9134Z2Hj1PWNitDOvgoAFnxyax8oIyx6eB4hMnNkB6xyr3X5XQXqsCsVRGYHYUOLvNuAag1kaNcVx+'
      + 'juqijxd0huvk60PMn5JjQijNl4ij36YwoqyN4UdP16LjIqYRIngaeHsTTR1XgIVmJIcuIfETV1QsiQCOYPw0s/ZTeri1DzpQq1Es5cERSupFBVp5Y8tJUna0Yx/oLh2SBhsw6BPixm6jhLAj'
      + 'qvQn+gmMv4AKDfTYdSPDqg1A+T3XFK/+vE+zOGW0/DHKr2ZqNYUQyD1adi3QA=='
    );
  });

  it('verifies valid signature successfully', () => {
    const signer = new Signer(
      new PrivateKey(privateKeyPath, '1234567'),
      new PublicKey(publicKeyPath)
    );

    const hash = signer.sign(params);
    const result = signer.verify(params, hash);

    expect(result).toBe(true);
  });

  it('fails verification with bad hash', () => {
    const signer = new Signer(
      new PrivateKey(privateKeyPath, '1234567'),
      new PublicKey(publicKeyPath)
    );

    const result = signer.verify(params, 'badhash');

    expect(result).toBe(false);
  });

  it('throws SignerException when signing fails', () => {
    const fakeKey = {} as KeyObject; // Invalid key object
    const mockPrivateKey = {
      getKey: vi.fn(() => {
        throw new Error('Bad key');
      }),
    } as unknown as PrivateKey;

    const mockPublicKey = {
      getKey: vi.fn(),
    } as unknown as PublicKey;

    const signer = new Signer(mockPrivateKey, mockPublicKey);

    expect(() =>
      signer.sign({
        AMOUNT: '100',
        ORDERNUMBER: '123456',
      })
    ).toThrowError(new SignerException('Unable to sign data'));
  });

  it('returns false when verification fails', () => {
    const realPrivateKey = vi.fn(() => {
      throw new Error('never called');
    });

    const mockPublicKey = {
      getKey: vi.fn(() => {
        // Pass a dummy but structurally valid key that fails verify
        return {} as KeyObject;
      }),
    } as unknown as PublicKey;

    const mockPrivateKey = {
      getKey: realPrivateKey,
    } as unknown as PrivateKey;

    const signer = new Signer(mockPrivateKey, mockPublicKey);

    const result = signer.verify(
      {
        AMOUNT: '100',
        ORDERNUMBER: '123456',
      },
      'invalidbase64signature=='
    );

    expect(result).toBe(false);
  });
});
