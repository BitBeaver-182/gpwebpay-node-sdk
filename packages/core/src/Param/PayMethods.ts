import { Param } from "../Enum/Param";
import type { PayMethod as PayMethodEnum } from "../Enum/PayMethod";
import type { IParam } from "./IParam";

export class PayMethods implements IParam {
	private methods: PayMethodEnum[];
	private string!: string;

	/**
	 * PayMethods constructor.
	 *
	 * @param methods
	 */
	constructor(...methods: PayMethodEnum[]) {
		this.methods = Array.from(new Set(methods));
		this.createString();
	}

	public toString(): string {
		return this.string;
	}

	public getParamName(): string {
		return Param.PAYMETHODS;
	}

	public getValue(): PayMethodEnum[] {
		return this.methods;
	}

	public addMethod(method: PayMethodEnum): void {
		this.methods.push(method);
		this.methods = Array.from(new Set(this.methods));
		this.createString();
	}

	private createString(): void {
		this.string = this.methods.join(",");
	}
}
