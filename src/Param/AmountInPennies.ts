import { Param } from "../Enum/Param";
import type { IAmount } from "./IAmount";

export class AmountInPennies implements IAmount {
	private amount: number;

	constructor(amount: number) {
		this.amount = amount;
	}

	public getParamName(): string {
		return Param.AMOUNT;
	}

	public getValue(): number {
		return this.amount;
	}

	public toString(): string {
		return this.amount.toString();
	}
}
