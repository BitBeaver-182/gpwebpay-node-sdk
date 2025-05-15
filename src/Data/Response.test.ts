import { describe, it, expect } from 'vitest'
import { Param } from '../Enum/Param'
import { Token } from '../Param/Token'
import { UserParam } from '../Param/UserParam'
import { Response as ResponseData } from './Response'
import { Response as ResponseEnum } from '../Enum/Response'
import { Operation } from '../Enum/Operation'


const params = {
  [Param.OPERATION]: Operation.CREATE_ORDER,
  [Param.ORDERNUMBER]: '123456',
  [Param.MERORDERNUM]: '12345678',
  [Param.MD]: 'czk|sometext',
  [ResponseEnum.PRCODE]: '0',
  [ResponseEnum.SRCODE]: '0',
  [ResponseEnum.RESULTTEXT]: 'resulttext',
  [Param.DIGEST]: 'hash1',
  [ResponseEnum.DIGEST1]: 'hash2',
  'gatewayKey': 'czk'
}

describe('Response', () => {
  it('should create GPWebPay Response correctly', () => {
    const response = new ResponseData(
      params[Param.OPERATION],
      params[Param.ORDERNUMBER],
      params[Param.MERORDERNUM],
      params[Param.MD],
      Number(params[ResponseEnum.PRCODE]),
      Number(params[ResponseEnum.SRCODE]),
      params[ResponseEnum.RESULTTEXT],
      params[Param.DIGEST],
      params[ResponseEnum.DIGEST1],
      params['gatewayKey']
    )

    response.addParam(new UserParam('userparam'))

    expect(response.getOrderNumber()).toBe('123456')
    expect(response.getMerOrderNumber()).toBe('12345678')
    expect(response.getMd()).toBe('sometext')
    expect(response.getPrcode()).toBe(0)
    expect(response.getSrcode()).toBe(0)
    expect(response.getResultText()).toBe('resulttext')
    expect(response.getDigest()).toBe('hash1')
    expect(response.getDigest1()).toBe('hash2')
    expect(response.getGatewayKey()).toBe('czk')
    expect(response.getUserParam1()).toBe('userparam')
    expect(response.hasError()).toBe(false)
  })

  it('should return correct response parameters', () => {
    const response = new ResponseData(
      params[Param.OPERATION],
      params[Param.ORDERNUMBER],
      params[Param.MERORDERNUM],
      params[Param.MD],
      Number(params[ResponseEnum.PRCODE]),
      Number(params[ResponseEnum.SRCODE]),
      params[ResponseEnum.RESULTTEXT],
      params[Param.DIGEST],
      params[ResponseEnum.DIGEST1],
      params['gatewayKey']
    )

    response.addParam(new Token('XXXX'))

    expect(response.getMd()).toBe('sometext')
    expect(response.getOrderNumber()).toBe(params[Param.ORDERNUMBER])
    expect(response.getMerOrderNumber()).toBe(params[Param.MERORDERNUM])
    expect(response.getPrcode()).toBe(0)
    expect(response.getSrcode()).toBe(0)
    expect(response.getResultText()).toBe(params[ResponseEnum.RESULTTEXT])
    expect(response.getGatewayKey()).toBe('czk')
    expect(response.getParams()[Param.TOKEN].getValue()).toBe('XXXX')
  })

  it('should recognize error state when PRCODE or SRCODE is non-zero', () => {

    const response = new ResponseData(
      params[Param.OPERATION],
      params[Param.ORDERNUMBER],
      params[Param.MERORDERNUM],
      params[Param.MD],
      1000,
      30,
      params[ResponseEnum.RESULTTEXT],
      params[Param.DIGEST],
      params[ResponseEnum.DIGEST1],
      params['gatewayKey']
    )

    expect(response.hasError()).toBe(true)
  })
})
