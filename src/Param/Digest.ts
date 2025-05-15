import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import { IParam } from "./IParam";


export class Digest implements IParam {
  private value: string;

  /**
   * Description constructor.
   *
   * @param value
   * @throws InvalidArgumentException
   */
  constructor(value: string) {
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
    return Param.DIGEST;
  }

  /**
   * @param value
   * @throws InvalidArgumentException
   */
  protected validate(value: string): void {
    assertMaxLength(value, 2000, this.getParamName());
  }
}