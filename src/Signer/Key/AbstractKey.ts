import { existsSync, readFileSync } from 'fs';
import { KeyObject } from 'crypto';
import { InvalidArgumentException } from '../../Exceptions/InvalidArgumentException';
import { SignerException } from '../../Exceptions/SignerException';



export abstract class AbstractKey {
  protected key: KeyObject | null = null;

  constructor(protected readonly file: string) {
    this.verifyFile(file);
  }

  public getKey(): KeyObject {
    if (this.key !== null) {
      return this.key;
    }
    this.key = this.createKey();
    return this.key;
  }

  protected verifyFile(file: string): void {
    if (!existsSync(file)) {
      throw new InvalidArgumentException(`Key file (${file}) does not exist or is not readable!`);
    }
  }

  protected getContent(): string {
    try {
      return readFileSync(this.file, 'utf-8');
    } catch (err) {
      throw new SignerException(`Failed to open file with key "${this.file}"`);
    }
  }

  protected abstract createKey(): KeyObject;
}
