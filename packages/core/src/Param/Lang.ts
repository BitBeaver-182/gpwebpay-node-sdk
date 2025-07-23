import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class Lang implements IParam {
	private value: string;

	/**
	 * Lang constructor.
	 *
	 * @param value
	 * @throws InvalidArgumentException
	 */
	constructor(value: string) {
		assertMaxLength(value, 2, this.getParamName());
		this.value = value;
	}

	/**
	 * @return string
	 */
	public getValue(): string {
		return this.value;
	}

	/**
	 * @return string
	 */
	public toString(): string {
		return this.value;
	}

	/**
	 * @return string
	 */
	public getParamName(): string {
		return Param.LANG;
	}
}
