import { Param } from "../Enum/Param";
import { assertIsEmail, assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class Email implements IParam {
  private value: string;

  /**
   * Email constructor.
   * 
   * @param value 
   * 
   * @throws InvalidArgumentException 
   */
  constructor(value: string) {
    value = value.trim();
    this.validate(value);
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public getParamName(): string {
    return Param.EMAIL;
  }

  /**
   * @param value 
   * 
   * @throws InvalidArgumentException 
   */
  protected validate(value: string): void {
    assertMaxLength(value, 255, 'EMAIL');
    assertIsEmail(value);
  }
}