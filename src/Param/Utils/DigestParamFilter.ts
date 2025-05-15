import { ResponseInterface } from "../../Data/ResponseInterface";
import { Param } from "../../Enum/Param";
import { Response } from "../../Enum/Response";


export class DigestParamsFilter {

  private constructor() {
    // Prevent from overwriting
  }


  /**
   * @var string[] DIGEST_PARAMS_KEYS
   */
  public static readonly DIGEST_PARAMS_KEYS: (Param | Response)[] = [
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
    Param.PAYMETHOD,
    Param.DISABLEPAYMETHOD,
    Param.PAYMETHODS,
    Param.EMAIL,
    Param.REFERENCENUMBER,
    Param.ADDINFO,
    Param.TOKEN,
    Param.FAST_TOKEN,
    Param.USERPARAM,
    Param.FASTPAYID,
    Response.RESULTTEXT,
    Response.SRCODE,
    Response.PRCODE,
    Response.EXPIRY,
    Response.ACSRES,
    Response.ACCODE,
    Response.DAYTOCAPTURE,
    Response.TOKENREGSTATUS,
  ];

  /**
   * @param params Record<string, string>
   * @returns Record<string, string>
   */
  public static filter(params: Record<string, string>): Record<string, string> {
    const filteredParams: Record<string, string> = {};
    for (const key of DigestParamsFilter.DIGEST_PARAMS_KEYS) {
      const paramKey = typeof key === 'string' ? key : key; // Handle both string and enum values
      if (params.hasOwnProperty(paramKey)) {
        filteredParams[paramKey] = params[paramKey];
      }
    }
    return filteredParams;
  }
}

