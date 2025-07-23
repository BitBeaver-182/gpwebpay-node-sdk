import { Operation as OperationEnum } from "../Enum/Operation";
import type { Param as ParamEnum } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import type { Currency } from "../Param/Currency";
import type { IAmount } from "../Param/IAmount";
import type { IParam } from "../Param/IParam";
import { Md } from "../Param/Md";
import { Operation as OperationParam } from "../Param/Operation";
import type { OrderNumber } from "../Param/OrderNumber";
import type { ResponseUrl } from "../Param/ResponseUrl";
import type { OperationInterface } from "./OperationInterface";

export class Operation implements OperationInterface {
	private gateway: string | null = null;
	private params: Record<string, IParam> = {};

	constructor(
		orderNumber: OrderNumber,
		amount: IAmount,
		currency: Currency,
		gateway?: string | null,
		responseUrl?: ResponseUrl | null,
		operation?: OperationEnum | null,
	) {
		this.addParam(new OperationParam(operation ?? OperationEnum.CREATE_ORDER));
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
		let internalParam = param;

		if (param instanceof Md && this.gateway !== String(param)) {
			internalParam = new Md(`${this.gateway}|${param}`);
		}

		const name = internalParam.getParamName();
		if (!name) {
			throw new InvalidArgumentException("Parameter name cannot be empty");
		}

		this.params[name] = internalParam;

		return this;
	}

	public getParam(param: ParamEnum): IParam | null {
		return this.params[String(param)] ?? null;
	}

	public getParams(): IParam[] {
		return Object.values(this.params);
	}
}
