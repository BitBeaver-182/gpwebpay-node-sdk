import { describe, it, expect } from 'vitest';
import { Param } from '../Enum/Param';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { FastToken } from './FastToken';
import { faker } from '@faker-js/faker';

describe('FastToken', () => {
  it('should create with valid token', () => {
    const token = new FastToken('token');

    expect(String(token)).toBe('token');
    expect(token.getValue()).toBe('token');
    expect(token.getParamName()).toBe(Param.FAST_TOKEN);
  });

  it('should throw for token longer than 64 characters', () => {
    const longToken = faker.string.alphanumeric({ length: 300 });

    expect(() => new FastToken(longToken)).toThrowError(
      new InvalidArgumentException(`FASTTOKEN max. length is 64! "${longToken.length}" given.`)
    );
  });
});
