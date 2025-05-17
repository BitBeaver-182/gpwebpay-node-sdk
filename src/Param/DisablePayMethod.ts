import { Param } from "../Enum/Param";
import type { PayMethod as PayMethodEnum } from "../Enum/PayMethod";
import type { IParam } from "./IParam";

export class DisablePayMethod implements IParam {
	private value: PayMethodEnum;

	/**
	 * DisablePayMethod constructor.
	 *
	 * @param method PayMethodEnum
	 */
	constructor(method: PayMethodEnum) {
		this.value = method;
	}

	/**
	 * @returns string
	 */
	toString(): string {
		return String(this.value);
	}

	/**
	 * @returns string
	 */
	getParamName(): string {
		return Param.DISABLEPAYMETHOD;
	}

	/**
	 * @returns PayMethodEnum
	 */
	getValue(): PayMethodEnum {
		return this.value;
	}
}
