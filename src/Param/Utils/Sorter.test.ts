import { describe, it, expect, vi } from 'vitest';
import { IParam, Stringable } from '../IParam';
import { Sorter } from './Sorter';
import { Param } from '@/Enum/Param';

class FakeParam implements IParam {
  constructor(public value: string) { }

  getParamName(): string {
    return 'fake'
  }
  getValue(): number | string | Stringable | Array<string | Stringable> {
    return this.value
  }
  toString(): string {
    return this.value
  }
}

describe('Sorter', () => {
  it('should sort request params in correct order', () => {
    const inputParams: Record<string, FakeParam> = {};
    for (const key of Sorter.REQUEST_PARAM_ORDER) {
      inputParams[key] = new FakeParam('someparam');
    }

    const sorted = Sorter.sortRequestParams(inputParams);
    expect(Object.keys(sorted)).toEqual(Sorter.REQUEST_PARAM_ORDER);
  });

  it('should sort response params in correct order', () => {
    const inputParams: Record<string, FakeParam> = {};
    for (const key of Sorter.RESPONSE_PARAM_ORDER) {
      inputParams[key] = new FakeParam('someparam');
    }

    const sorted = Sorter.sortResponseParams(inputParams);
    expect(Object.keys(sorted)).toEqual(Sorter.RESPONSE_PARAM_ORDER);
  });

  it('should place unknown keys last when sorting', () => {
    const input: Record<string, FakeParam> = {
      UNKNOWN_KEY: new FakeParam('z-last'),
      [Param.MERCHANTNUMBER]: new FakeParam('a-first'),
    };

    const result = Sorter['sort'](input, { [Param.MERCHANTNUMBER]: 0 });
    const keys = Object.keys(result);

    expect(keys[0]).toBe(Param.MERCHANTNUMBER);
    expect(keys[1]).toBe('UNKNOWN_KEY'); // Infinity sort order fallback
  });

  it('should handle mixed Param and Response in sortResponseParams', () => {
    const allKeys = Sorter.RESPONSE_PARAM_ORDER.map(k => k.toString());

    const input: Record<string, FakeParam> = {};
    for (const key of allKeys) {
      input[key] = new FakeParam('value');
    }

    const result = Sorter.sortResponseParams(input);
    expect(Object.keys(result)).toEqual(allKeys);
  });

  it('should cover typeof param !== "string" branch in sortResponseParams', () => {
    // simulate non-string enum-like value
    const mockParam = 1234 as unknown as Param;

    const spy = vi.spyOn(Sorter as any, 'sort');

    const params = { [mockParam]: new FakeParam('val') };
    Sorter.RESPONSE_PARAM_ORDER.push(mockParam);

    Sorter.sortResponseParams(params);

    expect(spy).toHaveBeenCalled();
  });

  it('should cover order[key] === undefined case (fallback to Infinity)', () => {
    const params = {
      a: new FakeParam('val1'),
      b: new FakeParam('val2'), // not in order
    };

    const customOrder = { a: 0 }; // 'b' is NOT included

    const result = (Sorter as any).sort(params, customOrder);
    expect(Object.keys(result)).toEqual(['a', 'b']); // 'b' goes last
  });


});
