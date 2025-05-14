/**
 * This file is part of the Pixidos package.
 *
 *  (c) Ondra Votava <ondra@votava.dev>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 */

import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";



interface IParam {
  getValue(): string;
  getParamName(): string;
}

export class MerchantNumber implements IParam {
  private value: string;

  constructor(value: string) {
    assertMaxLength(value, 10, this.getParamName());
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public getParamName(): string {
    return Param.MERCHANTNUMBER;
  }
}

