import { InvalidArgumentException } from "./Exceptions/InvalidArgumentException";

export function assertIsInteger(value: unknown, name: string): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new InvalidArgumentException(`${name} must be a numeric type, "${typeof value}" given.`);
  }

  if (!/^[1-9]\d*$/.test(String(value))) {
    throw new InvalidArgumentException(`${name} must be an integer, "${value}" given.`);
  }
}

export function assertMaxLength(value: string | number, length: number, name: string): void {
  if (String(value).length > length) {
    throw new InvalidArgumentException(`${name} max. length is ${length}! "${String(value).length}" given.`);
  }
}

export function assertLength(value: string | number, length: number, name: string): void {
  if (String(value).length !== length) {
    throw new InvalidArgumentException(`${name} length must be ${length}! "${String(value).length}" given.`);
  }
}

/**
 * Validates whether a string is a valid email address
 * @param {string} value - The string to validate as an email
 * @throws {InvalidArgumentException} If the value is not a valid email address
 */
export function assertIsEmail(value: string): void {
  // RFC 5322 compliant regex for email validation
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(value)) {
    throw new InvalidArgumentException(`EMAIL is not valid! "${value}" given.`);
  }
}


export function assertUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new InvalidArgumentException('URL is Invalid.');
  }
}
