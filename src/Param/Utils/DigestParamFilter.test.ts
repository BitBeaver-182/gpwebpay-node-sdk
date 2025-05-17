import { describe, it, expect } from 'vitest';
import { Param } from '../../Enum/Param';
import { Response } from '../../Enum/Response';
import { DigestParamsFilter } from './DigestParamFilter';

describe('DigestParamsFilter', () => {
  it('should filter out unwanted params (like DIGEST, PANPATTERN, LANG)', () => {
    const params: Record<string, string> = {
      [Param.ORDERNUMBER]: 'someparam',
      [Param.OPERATION]: 'someparam',
      [Param.MERCHANTNUMBER]: 'someparam',
      [Param.DEPOSITFLAG]: 'someparam',
      [Param.AMOUNT]: 'someparam',
      [Param.CURRENCY]: 'someparam',
      [Param.MERORDERNUM]: 'someparam',
      [Param.DESCRIPTION]: 'someparam',
      [Param.RESPONSE_URL]: 'someparam',
      [Param.MD]: 'someparam',
      [Param.USERPARAM]: 'someparam',
      [Param.FASTPAYID]: 'someparam',
      [Param.VRCODE]: 'someparam',
      [Param.DISABLEPAYMETHOD]: 'someparam',
      [Param.PAYMETHOD]: 'someparam',
      [Param.EMAIL]: 'someparam',
      [Param.PAYMETHODS]: 'someparam',
      [Param.REFERENCENUMBER]: 'someparam',
      [Param.ADDINFO]: 'someparam',
      [Param.PANPATTERN]: 'someparam',
      [Param.TOKEN]: 'someparam',
      [Param.FAST_TOKEN]: 'someparam',
      [Param.LANG]: 'someparam',
      [Param.DIGEST]: 'someparam',
      [Response.RESULTTEXT]: 'someparam',
      [Response.SRCODE]: 'someparam',
      [Response.PRCODE]: 'someparam',
      [Response.EXPIRY]: 'someparam',
      [Response.ACSRES]: 'someparam',
      [Response.ACCODE]: 'someparam',
      [Response.DAYTOCAPTURE]: 'someparam',
      [Response.TOKENREGSTATUS]: 'someparam',
    };

    const filtered = DigestParamsFilter.filter(params);

    const expectedKeys = DigestParamsFilter.DIGEST_PARAMS_KEYS.filter(key =>
      Object.prototype.hasOwnProperty.call(params, key)
    );

    expect(Object.keys(filtered)).toEqual(expectedKeys);
  });
});
