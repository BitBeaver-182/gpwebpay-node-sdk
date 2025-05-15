import { describe, expect, it } from 'vitest';
import { Param } from '../Enum/Param';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { ReferenceNumber } from './ReferenceNumber';
import { faker } from '@faker-js/faker';


describe('ReferenceNumber', () => {
  it('should create a ReferenceNumber instance correctly', () => {
    const referenceNumber = new ReferenceNumber('REF123456789');

    expect(String(referenceNumber)).toBe('REF123456789');
    expect(referenceNumber.getValue()).toBe('REF123456789');
    expect(referenceNumber.getParamName()).toBe(Param.REFERENCENUMBER);
  });

  it('should throw InvalidArgumentException for a long reference number', () => {
    const invalidString = faker.string.alphanumeric({ length: 21 })
    expect(() => new ReferenceNumber(invalidString)).toThrowError(InvalidArgumentException);
    expect(() => new ReferenceNumber(invalidString)).toThrowError(
      'REFERENCENUMBER has invalid length(max 20) or contains invalid char. Allowed chars are(0-9A-Za-z(space)#*+,-./:;=@^_).'
    );
  });
});