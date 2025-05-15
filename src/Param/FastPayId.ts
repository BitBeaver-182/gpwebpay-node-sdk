import { Param } from "../Enum/Param";
import { assertIsInteger, assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class FastPayId implements IParam {
  private value: number | string;

  /**
   * FastPayId constructor.
   * @param fastPayId max. length is 15 and can contain only numbers
   * 
   * @throws InvalidArgumentException
   */
  constructor(fastPayId: number | string) {
    assertIsInteger(fastPayId, this.getParamName());
    assertMaxLength(fastPayId, 15, this.getParamName());
    this.value = fastPayId;
  }

  public toString(): string {
    return String(this.value);
  }

  public getParamName(): string {
    return Param.FASTPAYID;
  }

  public getValue(): number | string {
    return this.value;
  }
}