import type { IParam } from "./IParam";

export class ResponseParam implements IParam {
	private value: string;
	private name: string;

	/**
	 * Email constructor.
	 *
	 * @param value - The value.
	 * @param name - The name.
	 */
	constructor(value: string, name: string) {
		this.value = value.trim();
		this.name = name;
	}

	getValue(): string {
		return this.value;
	}

	toString(): string {
		return this.value;
	}

	getParamName(): string {
		return this.name;
	}
}
