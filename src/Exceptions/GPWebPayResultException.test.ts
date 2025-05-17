import { describe, it, expect } from 'vitest';
import { GPWebPayResultException } from '../Exceptions/GPWebPayResultException';
import { ResponseError } from "../Data/ResponseError";

describe('GPWebPayResultExceptionTest', () => {
  it('should create GPWebPayResultException with correct properties', () => {
    const exception = new GPWebPayResultException('', 30, 1001, 'resulttext');

    expect(exception.getPrcode()).toBe(30);
    expect(exception.getSrcode()).toBe(1001);
    expect(exception.getResultText()).toBe('resulttext');
  });

  it('should create GPWebPayResultException with previous error and stack', () => {
    const previousError = new Error('Previous error');
    const exception = new GPWebPayResultException(
      'Error with previous',
      50,
      2002,
      'Previous error details',
      1,
      previousError
    );

    expect(exception.message).toBe('Error with previous');
    expect(exception.getPrcode()).toBe(50);
    expect(exception.getSrcode()).toBe(2002);
    expect(exception.getResultText()).toBe('Previous error details');
    expect(exception.stack).toBe(previousError.stack); // Check if stack is attached
  });
  it('should translate error message using ResponseError', () => {
    const exception = new GPWebPayResultException('', 30, 1001, 'resulttext');
    expect(exception.translate('cz')).toBe('Zamitnuto v autorizacnim centru, katra blokována');
    expect(exception.translate('en')).toBe('Declined in AC, Card blocked');
  });
});
