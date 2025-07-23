import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class Md implements IParam {
	private value: string;

	/**
	 * Md constructor.
	 *
	 * @param value
	 *
	 * @throws InvalidArgumentException
	 */
	constructor(value: string) {
		assertMaxLength(value, 255, this.getParamName());
		this.value = value;
	}

	public getValue(): string {
		return this.value;
	}

	public toString(): string {
		return this.value;
	}

	public getParamName(): string {
		return Param.MD;
	}
}
