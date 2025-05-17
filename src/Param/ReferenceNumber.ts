import { Param } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import type { IParam } from "./IParam";

export class ReferenceNumber implements IParam {
	private readonly PATTERN: RegExp = /(^[\dA-Za-z #$*+,\-./:;=^_@]{1,20}$)/;

	private value: string;

	constructor(value: string) {
		this.validate(value);
		this.value = value;
	}

	toString(): string {
		return this.value;
	}

	getParamName(): string {
		return Param.REFERENCENUMBER;
	}

	getValue(): string {
		return this.value;
	}

	protected validate(value: string): void {
		if (!this.PATTERN.test(value)) {
			throw new InvalidArgumentException(
				`${this.getParamName()} has invalid length(max 20) or contains invalid char. Allowed chars are(0-9A-Za-z(space)#*+,-./:;=@^_).`,
			);
		}
	}
}
