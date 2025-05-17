import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentConfigProvider } from './Config/PaymentConfigProvider';
import { ResponseInterface } from './Data/ResponseInterface';
import { GPWebPayResultException } from './Exceptions/GPWebPayResultException';
import { SignerException } from './Exceptions/SignerException';
import { ResponseProvider } from './ResponseProvider';
import { SignerProviderInterface } from './Signer/SignerProviderInterface';
import { GPWebPayException } from './Exceptions/GPWebPayException';
import { createConfig } from '@tests/helpers/config';
import { SignerFactory } from './Signer/SignerFactory';
import { SignerProvider } from './Signer/SignerProvider';
import { ResponseFactory } from './Factory/ResponseFactory';
import { Param } from './Enum/Param';
import { Response } from './Enum/Response';


type CreateMethodParams = Parameters<ResponseFactory['create']>[0];


describe('ResponseProviderTest', () => {
  const createProvider = () => {
    const config = createConfig();
    const signerFactory = new SignerFactory();
    const configProvider = config.getPaymentConfigProvider();
    const signerProvider = new SignerProvider(signerFactory, config.getSignerConfigProvider());
    return new ResponseProvider(configProvider, signerProvider);
  };

  const createResponse = (params: CreateMethodParams) => {
    const config = createConfig()
    const factory = new ResponseFactory(config.getPaymentConfigProvider())
    return factory.create(params)
  }

  const getOkParams = (): Partial<Record<Param | Response, string>> => ({
    [Param.OPERATION]: 'CREATE_ORDER',
    [Param.ORDERNUMBER]: '123456789',
    [Param.MD]: 'czk',
    [Response.PRCODE]: '0',
    [Response.SRCODE]: '0',
    [Response.RESULTTEXT]: 'OK',
    [Param.DIGEST]: 'ttraG4dWR7mW49WYmdKqob63jh4OGhJ+rXv1urImUB/aFqle5v619xlGHhvhBUpRzNfQsvR1FwYvgymItxcgwfE1ZucDfuiI+pslCJVMipRpS93N3gDSdaMqhogZeQLtqdYy/zm+2vyDzQrdqPMdTK+4t09z4O09joQOPWHoMZiFHl5fpiTGKHm2o5wTMbUoiBzGqHw4ZFw9mdvpmDs2xGV3zuFow/2uU+n6Ld54ghbt2XZcUwzwUtzCn3AIUWp1ArkGIPEjaXErD6QrpJI4tnSVPjepU3Iwh4YY87QClrev/Rbkrix5oCTjwCvOKXObEmy1v9QypFvtBtmff0nOww==',
    [Response.DIGEST1]: 'Fw+jhpY9N5pEqHW9huA9GLP/1p07NnbuPIQDDJ1HdvO8xXBjD355o1LqiF1gAFE42fLi4kmi0mlyl30g0R/xv8Z2JeBf+X/sSGeSKrGGwyDnCCIwDCfjJnfXo+qXJTfv89fhrkehOkpwFiYpkqTeAs36xnELZQCaPzxOG8DzTH1DPuIt4fUlqqE01HLE3ssl0Aof/lRTgLuEMg24gYhgb1+qSixjnYbwD6nRZKAQw3PkT43yAYvxmKpIyo1/632tNQyQrs1p+DFqMYEIxxqJIA48texWVEp6hkFNzA4hvytWnCssaOiLGJc3rH3Gew5VNh++PxWXJLNi/l2K/MFTlA==',
  });

  const getErrorParams = (): Partial<Record<Param | Response, string>> => ({
    [Param.OPERATION]: 'CREATE_ORDER',
    [Param.ORDERNUMBER]: '123456789',
    [Param.MD]: 'czk',
    [Response.PRCODE]: '14',
    [Response.SRCODE]: '0',
    [Response.RESULTTEXT]: 'Duplicate order number',
    [Param.DIGEST]: 'dC9qPY4tCKa1kW+Z6x+qcaQY3ysxw5yQ/cMXx3ZjPX+movIwc1U7ZbAeOO/UwHQXO1WP0ZnFz+ofIWDdru+iCFNU9psTO9CoODjjJ6/USjLrvaLekUfNgHAYGj8x95PROFm7FqrXzMciWK8e46TMF/sh87VvxwI5PjIlrnIyBiu7j4E1a2UgIQgc8/s1CILvPbja/EMMs8lbI0EUQPdcl7A00GBk0tbUIvd71k1SGWhRmRIXzL5ECUBq6Bia7DVcSaF9qWOhGT3YdAFumjQVRTqZz6k3qZ68DYL2dlK3Iz1Zsaxri2z+SaB+D8+6ZnWFIecwod5D32lC1odW7Dp4zw==',
    [Response.DIGEST1]: 'RC42A0v24Ec+218B1ZTmyVl1hMiYrJrYrYGuslmSe1ye/3jMhOVZE3TmtCwv43/KqB9MP36l9lXzdFym0nnD66W+PGgeoPsUYslhN3x3igu49vNWJzi010WddQMzTMUgYz1aiO/y81il3IAV+35b/WhnlxOPd0is0Xc/5uHTkle2NZVX6TrQLa0F6MlkI0h6uJi2Gowlr6k+LEyBDJvcajh1d/IQ8q5FiLictOz6rrhKgKcWiW4xfKNnbYB20U8/WUhkLrW7vLPqOietf2PUJurcWzq5GbN72Rqi8Bp/9HYNQJXnxnlUiUEc4K6qDAzQgnXeC8Fv3BTux9b8Y/3tJQ==',
  });

  it('testSuccessVerifyResponse', () => {
    const provider = createProvider();
    const response = createResponse(getOkParams())

    expect(provider.verifyPaymentResponse(response)).toBe(true);
  });

  it.each([
    [Param.DIGEST],
    [Response.DIGEST1],
  ])('testFailedVerifyResponse - %s', (key) => {
    const provider = createProvider();
    const params = getOkParams()
    params[key] = "Bad Hash";
    const response = createResponse(params)

    expect(provider.verifyPaymentResponse(response)).toBe(false);
    expect(() => { provider.provide(response) }).toThrow(SignerException);
    expect(() => { provider.provide(response) }).toThrow('Digest or Digest1 is incorrect!');
  });

  it('testErrorResponse', () => {
    const provider = createProvider();
    const response = createResponse(getErrorParams());
    expect(() => provider.provide(response)).toThrow(GPWebPayResultException);
  });

  // it('should throw SignerException if verifyPaymentResponse returns false', () => {
  //   const provider = createProvider()
  //   const params = getOkParams()
  //   params["DIGEST"] = "Bad Hash";
  //   const response = createResponse(params);

  //   expect(() => {
  //     provider.provide(response);
  //   }).toThrow(SignerException);

  //   expect(() => {
  //     provider.provide(response);
  //   }).toThrow('Digest or Digest1 is incorrect!');
  // });


  it('should call onError when error response is provided', () => {
    const provider = createProvider();
    const response = createResponse(getErrorParams());
    const errorHandler = vi.fn();

    provider.addOnError(errorHandler);
    provider.provide(response);

    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(errorHandler).toHaveBeenCalledWith(expect.any(GPWebPayResultException), response);
  });

  it('should call onSuccess when successful response is provided', () => {
    const provider = createProvider();
    const response = createResponse(getOkParams());
    const successHandler = vi.fn();

    provider.addOnSuccess(successHandler);
    provider.provide(response);

    expect(successHandler).toHaveBeenCalledTimes(1);
    expect(successHandler).toHaveBeenCalledWith(response);
  });

});
