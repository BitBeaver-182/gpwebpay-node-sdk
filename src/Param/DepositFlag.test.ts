import { describe, it, expect } from 'vitest';
import { Param } from '../Enum/Param';
import { DepositFlag as DepositFlagEnum } from '../Enum/DepositFlag';
import { DepositFlag } from './DepositFlag';


describe('DepositFlag', () => {
  it('should create successfully with YES flag', () => {
    const depositFlag = new DepositFlag(DepositFlagEnum.YES);

    expect(String(depositFlag)).toBe('1');
    expect(depositFlag.getValue()).toEqual(DepositFlagEnum.YES);
    expect(depositFlag.getParamName()).toBe(Param.DEPOSITFLAG);
  });
});
