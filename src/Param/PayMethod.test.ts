import { describe, expect, it } from 'vitest';
import { Param } from '../Enum/Param';
import { PayMethod as PayMethodEnum } from '../Enum/PayMethod';
import { PayMethod } from './PayMethod';


describe('PayMethod', () => {
  it('should create a PayMethod instance correctly', () => {
    const payMethod = new PayMethod(PayMethodEnum.CARD);

    expect(payMethod.getValue()).toBe(PayMethodEnum.CARD);
    expect(String(payMethod)).toBe('CRD');
    expect(payMethod.getParamName()).toBe(Param.PAYMETHOD);
  });
});