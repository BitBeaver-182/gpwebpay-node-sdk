import { Param } from "../Enum/Param";
import { IParam } from "./IParam";
import { PayMethod as PayMethodEnum } from "../Enum/PayMethod";


export class PayMethod implements IParam {
  private value: PayMethodEnum;

  /**
   * PayMethod constructor.
   *
   * @param method PayMethodEnum
   */
  constructor(method: PayMethodEnum) {
    this.value = method;
  }

  toString(): string {
    return String(this.value);
  }

  getParamName(): string {
    return Param.PAYMETHOD;
  }

  /**
   * @return PayMethodEnum
   */
  getValue(): PayMethodEnum {
    return this.value;
  }
}