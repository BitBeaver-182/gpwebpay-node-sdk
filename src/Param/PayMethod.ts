import { Param } from "../Enum/Param";
import type { PayMethod as PayMethodEnum } from "../Enum/PayMethod";
import type { IParam } from "./IParam";

export class PayMethod implements IParam {
	private value: PayMethodEnum;

	/**
	 * PayMethod constructor.
	 *
	 * @param method PayMethodEnum
	 */
	constructor(method: PayMethodEnum) {
		this.value = method;
	}

	toString(): string {
		return String(this.value);
	}

	getParamName(): string {
		return Param.PAYMETHOD;
	}

	/**
	 * @return PayMethodEnum
	 */
	getValue(): PayMethodEnum {
		return this.value;
	}
}
