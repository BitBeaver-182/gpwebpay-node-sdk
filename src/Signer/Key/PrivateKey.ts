import { createPrivateKey, KeyObject } from 'crypto';
import { SignerException } from '../../Exceptions/SignerException';
import { AbstractKey } from './AbstractKey';

export class PrivateKey extends AbstractKey {
  constructor(file: string, private readonly password: string) {
    super(file);
  }

  protected createKey(): KeyObject {
    try {
      const content = this.getContent();
      return createPrivateKey({
        key: content,
        format: 'pem',
        passphrase: this.password,
      });
    } catch (error: any) {
      throw new SignerException(
        `"${this.file}" is not a valid PEM private key (or password is incorrect).`
      );
    }
  }
}
