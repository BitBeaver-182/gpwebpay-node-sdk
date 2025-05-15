import { describe, expect, it } from 'vitest';
import { Token } from './Token';
import { Param } from '@/Enum/Param';
import { InvalidArgumentException } from '@/Exceptions/InvalidArgumentException';
import { faker } from '@faker-js/faker';


describe('Token', () => {
  it('should create a Token instance correctly', () => {
    const token = new Token('token');

    expect(String(token)).toBe('token');
    expect(token.getValue()).toBe('token');
    expect(token.getParamName()).toBe(Param.TOKEN);
  });

  it('should throw InvalidArgumentException for a long token', () => {
    const invalidToken = faker.string.alphanumeric({ length: 100 })
    expect(() => new Token(invalidToken)).toThrowError(InvalidArgumentException);
    expect(() => new Token(invalidToken)).toThrowError(`TOKEN max. length is 64! "${invalidToken.length}" given.`);
  });
});