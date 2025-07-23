import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class MerchantNumber implements IParam {
	private value: string;

	/**
	 * MerchantNumber constructor.
	 *
	 * @param value string
	 * @throws InvalidArgumentException
	 */
	constructor(value: string) {
		assertMaxLength(value, 10, this.getParamName());
		this.value = value;
	}

	public getValue(): string {
		return this.value;
	}

	public toString(): string {
		return this.value;
	}

	public getParamName(): string {
		return Param.MERCHANTNUMBER;
	}
}
