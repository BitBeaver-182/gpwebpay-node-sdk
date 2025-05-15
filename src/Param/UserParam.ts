import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class UserParam implements IParam {
  private value: string;

  /**
   * Description constructor.
   *
   * @param value 
   * @throws InvalidArgumentException
   */
  constructor(value: string) {
    assertMaxLength(value, 255, this.getParamName());
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public getParamName(): string {
    return Param.USERPARAM;
  }
}