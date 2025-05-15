import { Param } from '@/Enum/Param';
import { InvalidArgumentException } from '@/Exceptions/InvalidArgumentException';
import { describe, expect, it } from 'vitest';
import { UserParam } from './UserParam';
import { faker } from '@faker-js/faker';

// Helper function to generate a long string (mimicking PHP's TestHelpers::getLongText300())
const getLongText300 = (): string => 'a'.repeat(300);

describe('UserParam', () => {
  it('should create a UserParam instance correctly', () => {
    const userParam = new UserParam('userParam');

    expect(String(userParam)).toBe('userParam');
    expect(userParam.getValue()).toBe('userParam');
    expect(userParam.getParamName()).toBe(Param.USERPARAM);
  });

  it('should throw InvalidArgumentException for a long user parameter', () => {
    const invalidString = faker.string.alphanumeric({ length: 300 })
    expect(() => new UserParam(invalidString)).toThrowError(InvalidArgumentException);
    expect(() => new UserParam(invalidString))
      .toThrowError(`USERPARAM1 max. length is 255! "${invalidString.length}" given.`);
  });
});