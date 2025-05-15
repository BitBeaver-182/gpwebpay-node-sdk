import { Param } from "../Enum/Param";
import { assertIsInteger, assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class MerOrderNum implements IParam {
  private value: number | string;

  /**
   * OrderNumber constructor.
   *
   * @param value - number|string
   *
   * @throws InvalidArgumentException
   */
  constructor(value: number | string) {
    this.validate(value);
    this.value = value;
  }

  /**
   * @return number|string
   */
  public getValue(): number | string {
    return this.value;
  }

  public getParamName(): string {
    return Param.MERORDERNUM;
  }

  public toString(): string {
    return String(this.value);
  }

  /**
   * @param value - number|string
   *
   * @throws InvalidArgumentException
   */
  protected validate(value: number | string): void {
    assertIsInteger(value, this.getParamName());
    assertMaxLength(value, 30, this.getParamName());
  }
}