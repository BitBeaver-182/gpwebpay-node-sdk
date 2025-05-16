import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { KeyObject } from 'crypto';
import { InvalidArgumentException } from '@/Exceptions/InvalidArgumentException';
import { AbstractKey } from './AbstractKey';

describe('AbstractKey', () => {
  it('throws InvalidArgumentException if file does not exist', () => {
    class TestKey extends AbstractKey {
      protected createKey(): KeyObject {
        throw new InvalidArgumentException('cannot create key');
      }
    }

    expect(() => {
      new TestKey('misssing_file');
    }).toThrowError(
      new InvalidArgumentException('Key file (misssing_file) does not exist or is not readable!')
    );
  });
});
