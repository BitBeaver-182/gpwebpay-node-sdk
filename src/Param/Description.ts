import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class Description implements IParam {
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
		return Param.DESCRIPTION;
	}

	protected validate(value: string): void {
		assertMaxLength(value, 255, Param.DESCRIPTION);
	}
}
