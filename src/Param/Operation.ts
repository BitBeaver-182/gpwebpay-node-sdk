import { Param } from "../Enum/Param";
import { IParam } from "./IParam";
import { Operation as OperationEnum } from "../Enum/Operation";

export class Operation implements IParam {
  private value: OperationEnum;

  /**
   * Operation constructor.
   *
   * @param operation OperationEnum
   */
  constructor(operation: OperationEnum) {
    this.value = operation;
  }

  /**
   * @return string
   */
  toString(): string {
    return String(this.value);
  }

  /**
   * @return string
   */
  getParamName(): string {
    return Param.OPERATION;
  }

  /**
   * @return OperationEnum
   */
  getValue(): OperationEnum {
    return this.value;
  }
}