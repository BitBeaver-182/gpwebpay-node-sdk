import type { DepositFlag as DepositFlagEnum } from "../Enum/DepositFlag";
import { Param } from "../Enum/Param";
// Import necessary enums and interfaces
import type { IParam } from "./IParam";

export class DepositFlag implements IParam {
	private value: DepositFlagEnum;

	constructor(flag: DepositFlagEnum) {
		this.value = flag;
	}

	toString(): string {
		return String(this.value);
	}

	getValue(): DepositFlagEnum {
		return this.value;
	}

	getParamName(): string {
		return Param.DEPOSITFLAG;
	}
}
