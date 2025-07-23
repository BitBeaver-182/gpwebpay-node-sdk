import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class FastToken implements IParam {
	private token: string;

	/**
	 * Token constructor.
	 *
	 * @param token max 64 chars
	 * @throws InvalidArgumentException
	 */
	constructor(token: string) {
		assertMaxLength(token, 64, this.getParamName());
		this.token = token;
	}

	public toString(): string {
		return this.token;
	}

	public getParamName(): string {
		return Param.FAST_TOKEN;
	}

	public getValue(): string {
		return this.token;
	}
}
