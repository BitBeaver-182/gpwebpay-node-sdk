import { PaymentConfigProvider } from '../Config/PaymentConfigProvider';
import { Response as ResponseData } from '../Data/Response';
import { ResponseInterface } from '../Data/ResponseInterface';
import { Param } from '../Enum/Param';
import { Response as ResponseEnum } from '../Enum/Response';
import { ResponseParam } from '../Param/ResponseParam';
import { Operation as OperationEnum } from '@/Enum/Operation';

export class ResponseFactory {
  constructor(private readonly configProvider: PaymentConfigProvider) { }

  create(params: Partial<Record<Param | ResponseEnum, string>>): ResponseInterface {
    const clonedParams: Partial<Record<Param | ResponseEnum, string>> = { ...params };

    const md = this.getStringValue(Param.MD, clonedParams);
    let gateway = this.configProvider.getDefaultGateway();

    if (md !== '') {
      const [key, mdText] = md.split('|', 2);
      if (key !== '') {
        gateway = key;
      }
    }

    const response = new ResponseData(
      this.getStringValue(Param.OPERATION, clonedParams) as OperationEnum,
      this.getStringValue(Param.ORDERNUMBER, clonedParams),
      this.getStringValue(Param.MERORDERNUM, clonedParams),
      md,
      this.getIntValue(ResponseEnum.PRCODE, clonedParams, 1000),
      this.getIntValue(ResponseEnum.SRCODE, clonedParams, 0),
      this.getStringValue(ResponseEnum.RESULTTEXT, clonedParams),
      this.getStringValue(Param.DIGEST, clonedParams),
      this.getStringValue(ResponseEnum.DIGEST1, clonedParams),
      gateway
    );

    const paramKeys = Object.values(Param);
    const responseKeys = ResponseData.RESPONSE_PARAMS;
    const allKnownKeys = [...paramKeys, ...responseKeys];

    for (const [key, value] of Object.entries(clonedParams)) {
      if (allKnownKeys.includes(key as Param | ResponseEnum)) {
        response.addParam(new ResponseParam(value, key));
      }
    }

    response.sortParams();

    return response;
  }

  private getStringValue<T = Record<Param | ResponseEnum, string>>(name: keyof T, params: Partial<T>, defaultValue = '') {
    const value = params[name] ?? defaultValue;
    delete params[name];
    return value;
  }

  private getIntValue<T = Record<Param | ResponseEnum, string>>(name: keyof T, params: Partial<T>, defaultValue = 0) {
    const value = params[name] ?? `${defaultValue}`;
    delete params[name];
    return parseInt(value as string, 10);
  }
}
