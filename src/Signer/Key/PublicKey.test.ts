import { describe, it, expect, vi } from 'vitest';
import { publicKeyPath } from '@tests/helpers/keys';
import { PublicKey } from './PublicKey';

describe('PublicKey', () => {
  it('creates a public key successfully', () => {
    try {
      new PublicKey(publicKeyPath);
      // If no error is thrown, test passes
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('returns the same key on multiple getKey() calls (cached)', () => {
    const publicKey = new PublicKey(publicKeyPath);

    const key1 = publicKey.getKey();
    const key2 = publicKey.getKey();

    expect(key1).toBe(key2); // checks object identity
  });

  it('throws if content is invalid public key', () => {
    const file = publicKeyPath;

    const badKey = new PublicKey(file);

    // Mock getContent to return invalid data
    vi.spyOn(badKey as any, 'getContent').mockReturnValue('');

    expect(() => badKey.getKey()).toThrowError(
      `"${file}" is not a valid public key.`
    );
  });
});
