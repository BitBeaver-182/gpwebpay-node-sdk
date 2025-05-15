
import { Param } from "../Enum/Param";
import { assertIsInteger } from "../validators";
import { IAmount } from "./IAmount";


export class Amount implements IAmount {
  private amount: number;

  /**
   * @deprecated use AmountInPennies instead
   * Amount constructor.
   *
   * @param amount
   * @param converToPennies
   *
   * @throws InvalidArgumentException
   */
  constructor(amount: number, converToPennies: boolean = true) {
    // Convert to pennies
    if (converToPennies) {
      amount *= 100;
    }

    assertIsInteger(amount, 'AMOUNT');

    this.amount = Math.floor(amount);
  }

  /**
   * @return string
   */
  public getParamName(): string {
    return Param.AMOUNT;
  }

  /**
   * @return number
   */
  public getValue(): number {
    return this.amount;
  }

  /**
   * @return string
   */
  public toString(): string {
    return this.amount.toString();
  }
}

