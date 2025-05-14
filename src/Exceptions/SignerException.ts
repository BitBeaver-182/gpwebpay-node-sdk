import { GPWebPayException } from "./GPWebPayException";

export class SignerException extends GPWebPayException {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, SignerException.prototype);
  }
}
