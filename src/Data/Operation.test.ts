import { describe, expect, it } from 'vitest';
import { Currency } from '../Param/Currency';
import { Currency as CurrencyEnum } from '../Enum/Currency';
import { Param } from '../Enum/Param';
import { AmountInPennies } from '../Param/AmountInPennies';
import { Md } from '../Param/Md';
import { OrderNumber } from '../Param/OrderNumber';
import { ResponseUrl } from '../Param/ResponseUrl';
import { Operation } from './Operation';

describe('OperationTest', () => {
  it('should successfully create a basic operation', () => {
    const operation = new Operation(
      new OrderNumber('123456'),
      new AmountInPennies(100000),
      new Currency(CurrencyEnum.CZK),
      'CZK',
      new ResponseUrl('http://response.com/proccess-gpw-response')
    );

    operation.addParam(new Md('someMd'));

    expect(operation.getParam(Param.ORDERNUMBER)?.toString()).toBe('123456');
    expect(operation.getParam(Param.AMOUNT)?.toString()).toBe('100000');
    expect(operation.getParam(Param.CURRENCY)?.toString()).toBe('203');
    expect(operation.getGateway()).toBe('czk');
    const responseUrl = operation.getParam(Param.RESPONSE_URL);
    expect(responseUrl).not.toBeNull();
    expect(responseUrl?.getValue()).toBe('http://response.com/proccess-gpw-response');
    expect(operation.getParam(Param.MD)?.toString()).toBe('czk|someMd');
  });

  // You can add more test cases here as needed
});