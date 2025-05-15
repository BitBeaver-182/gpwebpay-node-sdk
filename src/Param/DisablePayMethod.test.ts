import { describe, it, expect } from 'vitest';
import { Param } from '../Enum/Param';
import { DisablePayMethod } from './DisablePayMethod';
import { PayMethod } from '../Enum/PayMethod';

describe('DisablePayMethod', () => {
  it('should create successfully with CARD pay method', () => {
    const payMethod = new DisablePayMethod(PayMethod.CARD);

    expect(payMethod.getValue()).toEqual(PayMethod.CARD);
    expect(String(payMethod)).toBe('CRD');
    expect(payMethod.getParamName()).toBe(Param.DISABLEPAYMETHOD);
  });
});
