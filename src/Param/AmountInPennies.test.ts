import { describe, it, expect } from 'vitest';
import { AmountInPennies } from './AmountInPennies';

describe('AmountInPennies', () => {
  it('should create successfully with integer value', () => {
    const amount = new AmountInPennies(100000);

    expect(amount.getValue()).toBe(100000);
    expect(String(amount)).toBe('100000');
  });
});
