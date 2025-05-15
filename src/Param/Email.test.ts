import { describe, it, expect } from 'vitest';
import { Email } from './Email';
import { Param } from '../Enum/Param';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { faker } from '@faker-js/faker';

describe('Email', () => {
  it('should create a valid email', () => {
    const email = new Email('test@test.com');

    expect(email.getValue()).toBe('test@test.com');
    expect(String(email)).toBe('test@test.com');
    expect(email.getParamName()).toBe(Param.EMAIL);
  });

  it('should throw for invalid email', () => {
    expect(() => new Email('test(@)test.com')).toThrowError(
      new InvalidArgumentException('EMAIL is not valid! "test(@)test.com" given.')
    );
  });

  it('should throw for too long email', () => {
    const longEmail = faker.string.alpha({ length: 300 }) + '@test.com';

    expect(() => new Email(longEmail)).toThrowError(
      new InvalidArgumentException(`EMAIL max. length is 255! "${longEmail.length}" given.`)
    );
  });
});
