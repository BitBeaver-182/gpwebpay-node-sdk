import { describe, expect, it } from 'vitest';
import { Param } from '../Enum/Param';
import { Operation as OperationEnum } from '../Enum/Operation';
import { Operation } from './Operation';

describe('Operation', () => {
  it('should create an Operation instance correctly', () => {
    const operation = new Operation(OperationEnum.CREATE_ORDER);

    expect(operation.getValue()).toBe(OperationEnum.CREATE_ORDER);
    expect(String(operation)).toBe('CREATE_ORDER');
    expect(operation.getParamName()).toBe(Param.OPERATION);
  });
});