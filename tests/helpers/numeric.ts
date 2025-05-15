import { faker } from "@faker-js/faker"

export function generateIntegerString(length: number): string {
  if (length <= 0) {
    return '';
  }
  if (length === 1) {
    return faker.number.int({ min: 1, max: 9 }).toString();
  }

  const firstDigit = faker.number.int({ min: 1, max: 9 }).toString();
  const remainingDigits = faker.string.numeric({ length: length - 1 });
  return firstDigit + remainingDigits;
}
