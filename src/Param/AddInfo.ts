import { Param } from "../Enum/Param";
import { assertMaxLength } from "../validators";
import type { IParam } from "./IParam";

export class AddInfo implements IParam {
	private xml: string;

	/**
	 * AddInfo constructor.
	 *
	 * @param xml
	 *
	 * @throws InvalidArgumentException
	 */
	constructor(xml: string) {
		assertMaxLength(xml, 24000, this.getParamName());
		this.xml = xml;
	}

	/**
	 * @return string
	 */
	public getParamName(): string {
		return Param.ADDINFO;
	}

	/**
	 * @return string
	 */
	public toString(): string {
		return this.xml;
	}

	/**
	 * @return string
	 */
	public getValue(): string {
		return this.xml;
	}
}
