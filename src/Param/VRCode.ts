import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import { IParam } from "./IParam";

export class VRCode implements IParam {
  private code: string;

  /**
   * Token constructor.
   *
   * @param code max 48 chars
   * @throws InvalidArgumentException
   */
  constructor(code: string) {
    assertMaxLength(code, 48, this.getParamName());
    this.code = code;
  }

  /**
   * @return string
   */
  public toString(): string {
    return this.code;
  }

  /**
   * @return string
   */
  public getParamName(): string {
    return Param.VRCODE;
  }

  /**
   * @return string
   */
  public getValue(): string {
    return this.code;
  }
}