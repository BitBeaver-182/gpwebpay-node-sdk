import type { Currency as CurrencyEnum } from "../Enum/Currency";
import { Param } from "../Enum/Param";
import type { IParam } from "./IParam";

export class Currency implements IParam {
	private value: CurrencyEnum;

	constructor(currency: CurrencyEnum) {
		this.value = currency;
	}

	toString(): string {
		return String(this.value);
	}

	getParamName(): string {
		return Param.CURRENCY;
	}

	getValue(): CurrencyEnum {
		return this.value;
	}
}
