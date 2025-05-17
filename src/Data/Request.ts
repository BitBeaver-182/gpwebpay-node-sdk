import type { DepositFlag } from "../Param/DepositFlag";
import type { IParam } from "../Param/IParam";
import type { MerchantNumber } from "../Param/MerchantNumber";
import { DigestParamsFilter } from "../Param/Utils/DigestParamFilter";
import { Sorter } from "../Param/Utils/Sorter";
import type { OperationInterface } from "./OperationInterface";
import type { RequestInterface } from "./RequestInterface";

export class Request implements RequestInterface {
	private operation: OperationInterface;
	/**
	 * @var Record<string, string> $params
	 */
	private params: Record<string, string> = {};

	private url: string;

	/**
	 * @param operation OperationInterface
	 * @param merchantNumber MerchantNumber
	 * @param depositFlag DepositFlag
	 * @param url string
	 *
	 * @throws InvalidArgumentException
	 * @throws UnexpectedValueException
	 */
	constructor(
		operation: OperationInterface,
		merchantNumber: MerchantNumber,
		depositFlag: DepositFlag,
		url: string,
	) {
		this.operation = operation;
		this.url = url;
		this.setParam(merchantNumber);
		this.setParam(depositFlag);

		this.setParamsInternal();
	}

	/**
	 * @return Record<string, string>
	 */
	getParams(): Record<string, string> {
		return this.params;
	}

	sortParams(): void {
		const params = Sorter.sortRequestParams(this.params);
		this.params = params;
	}

	/**
	 * @return Record<string, string>
	 */
	getDigestParams(): Record<string, string> {
		this.sortParams();
		return DigestParamsFilter.filter(this.params);
	}

	/**
	 * @param param IParam
	 */
	setParam(param: IParam): void {
		this.params[param.getParamName()] = param.toString();
	}

	getRequestUrl(asPost = false): string {
		if (asPost) {
			return this.url;
		}

		const queryParams = new URLSearchParams(this.getParams()).toString();
		return `${this.url}?${queryParams}`;
	}

	/**
	 * Sets params to array
	 */
	private setParamsInternal(): void {
		for (const param of this.operation.getParams()) {
			this.setParam(param);
		}
	}
}
