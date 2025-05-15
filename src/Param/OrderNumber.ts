import { Param } from "../Enum/Param";
import { assertIsInteger, assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class OrderNumber implements IParam {
  private value: number | string;

  /**
   * OrderNumber constructor.
   *
   * @param value 
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
    return Param.ORDERNUMBER;
  }

  public toString(): string {
    return String(this.value);
  }

  /**
   * @param value 
   * 
   * @throws InvalidArgumentException 
   */
  protected validate(value: number | string): void {
    assertIsInteger(value, this.getParamName());
    assertMaxLength(value, 15, this.getParamName());
  }
}