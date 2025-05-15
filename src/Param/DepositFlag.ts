// Import necessary enums and interfaces
import { IParam } from './IParam';
import { DepositFlag as DepositFlagEnum } from '../Enum/DepositFlag';
import { Param } from '../Enum/Param';


export class DepositFlag implements IParam {
  private value: DepositFlagEnum;

  constructor(flag: DepositFlagEnum) {
    this.value = flag;
  }

  toString(): string {
    return String(this.value);
  }

  getValue(): DepositFlagEnum {
    return this.value;
  }

  getParamName(): string {
    return Param.DEPOSITFLAG;
  }
}

