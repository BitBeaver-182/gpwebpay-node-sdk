import { Param } from "../Enum/Param";
import { assertMaxLength, assertUrl } from "../validators";
import type { IParam } from "./IParam";

export class ResponseUrl implements IParam {
	private value: string;

	constructor(value: string) {
		this.validate(value);
		this.value = value;
	}

	public getValue(): string {
		return this.value;
	}

	public toString(): string {
		return this.value;
	}

	public getParamName(): string {
		return Param.RESPONSE_URL;
	}

	protected validate(value: string): void {
		assertMaxLength(value, 300, this.getParamName());
		assertUrl(value);
	}
}
