
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import { IAmount } from "../Param/IAmount";
import { IParam } from "../Param/IParam";
import { Md } from "../Param/Md";
import { OrderNumber } from "../Param/OrderNumber";
import { ResponseUrl } from "../Param/ResponseUrl";
import { Operation as OperationEnum } from "../Enum/Operation";
import { Operation as OperationParam } from "../Param/Operation";
import { Currency } from "../Param/Currency";
import { Param as ParamEnum } from "../Enum/Param";
import { OperationInterface } from "./OperationInterface";

export class Operation implements OperationInterface {
  private gateway: string | null = null;
  private params: Record<string, IParam> = {};

  constructor(
    orderNumber: OrderNumber,
    amount: IAmount,
    currency: Currency,
    gateway?: string | null,
    responseUrl?: ResponseUrl | null,
    operation?: OperationEnum | null
  ) {
    if (!operation) {
      operation = OperationEnum.CREATE_ORDER;
    }

    this.addParam(new OperationParam(operation));
    this.addParam(amount);
    this.addParam(orderNumber);
    this.addParam(currency);

    if (gateway !== null && gateway !== undefined) {
      this.gateway = gateway.toLowerCase();
      this.addParam(new Md(this.gateway));
    }

    if (responseUrl !== null && responseUrl !== undefined) {
      this.addParam(responseUrl);
    }
  }

  public getGateway(): string | null {
    return this.gateway;
  }

  public addParam(param: IParam): OperationInterface {
    if (param instanceof Md && this.gateway !== String(param)) {
      param = new Md(`${this.gateway}|${param}`);
    }

    const name = param.getParamName();
    if (!name) {
      throw new InvalidArgumentException('Parameter name cannot be empty');
    }

    this.params[name] = param;

    return this;
  }

  public getParam(param: ParamEnum): IParam | null {
    return this.params[String(param)] ?? null;
  }

  public getParams(): IParam[] {
    return Object.values(this.params);
  }
}
