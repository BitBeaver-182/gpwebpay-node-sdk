import { describe, test, expect } from 'vitest';
import { Param } from '../Enum/Param';
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException';
import { Md } from './Md';
import { faker } from '@faker-js/faker';


describe('Md', () => {
  test('should successfully create Md param', () => {
    const md = new Md('md');
    expect(String(md)).toBe('md');
    expect(md.getValue()).toBe('md');
    expect(md.getParamName()).toBe(Param.MD);
  });

  test('should throw exception for too long md value', () => {
    const longText = faker.string.alphanumeric({ length: 300 })
    expect(() => {
      new Md(longText);
    }).toThrow(InvalidArgumentException);
    expect(() => {
      new Md(longText);
    }).toThrow(`MD max. length is 255! "${longText.length}" given.`);
  });
});


