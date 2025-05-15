import { ResponseInterface } from "../../Data/ResponseInterface";
import { Param } from "../../Enum/Param";
import { Response } from "../../Enum/Response";

export class Sorter {
  public static readonly REQUEST_PARAM_ORDER: Param[] = [
    Param.MERCHANTNUMBER,
    Param.OPERATION,
    Param.ORDERNUMBER,
    Param.AMOUNT,
    Param.CURRENCY,
    Param.DEPOSITFLAG,
    Param.MERORDERNUM,
    Param.RESPONSE_URL,
    Param.DESCRIPTION,
    Param.MD,
    Param.USERPARAM,
    Param.VRCODE,
    Param.FASTPAYID,
    Param.PAYMETHOD,
    Param.DISABLEPAYMETHOD,
    Param.PAYMETHODS,
    Param.EMAIL,
    Param.REFERENCENUMBER,
    Param.ADDINFO,
    Param.PANPATTERN,
    Param.TOKEN,
    Param.FAST_TOKEN,
    Param.DIGEST,
    Param.LANG,
  ];

  public static readonly RESPONSE_PARAM_ORDER: (Param | Response)[] = [
    Param.OPERATION,
    Param.ORDERNUMBER,
    Param.MERORDERNUM,
    Param.MD,
    Response.PRCODE,
    Response.SRCODE,
    Response.RESULTTEXT,
    Param.USERPARAM,
    Param.ADDINFO,
    Param.TOKEN,
    Response.EXPIRY,
    Response.ACSRES,
    Response.ACCODE,
    Param.PANPATTERN,
    Response.DAYTOCAPTURE,
    Response.TOKENREGSTATUS,
    Param.DIGEST,
    Response.DIGEST1,
  ];

  /**
   * @template T
   * @param params Record<string, T>
   * @returns Record<string, T>
   */
  public static sortRequestParams<T>(params: Record<string, T>): Record<string, T> {
    const order: Record<string, number> = {};
    Sorter.REQUEST_PARAM_ORDER.forEach((param, index) => {
      order[param] = index;
    });

    return Sorter.sort(params, order);
  }

  /**
   * @template T
   * @param params Record<string, T>
   * @returns Record<string, T>
   */
  public static sortResponseParams<T>(params: Record<string, T>): Record<string, T> {
    const order: Record<string, number> = {};
    Sorter.RESPONSE_PARAM_ORDER.forEach((param, index) => {
      order[typeof param === 'string' ? param : param] = index;
    });

    return Sorter.sort(params, order);
  }

  /**
   * @template T
   * @param params Record<string, T>
   * @param order Record<string, number>
   * @returns Record<string, T>
   */
  private static sort<T>(params: Record<string, T>, order: Record<string, number>): Record<string, T> {
    const sortedKeys = Object.keys(params).sort((a, b) => {
      const indexA = order[a] !== undefined ? order[a] : Infinity;
      const indexB = order[b] !== undefined ? order[b] : Infinity;
      return indexA - indexB;
    });

    const sortedParams: Record<string, T> = {};
    for (const key of sortedKeys) {
      if (params.hasOwnProperty(key)) {
        sortedParams[key] = params[key];
      }
    }

    return sortedParams;
  }
}