import type { Operation as OperationEnum } from "../Enum/Operation";
import { Param } from "../Enum/Param";
import { Response as ResponseEnum } from "../Enum/Response";
import type { IParam } from "../Param/IParam";
import { Md } from "../Param/Md";
import { MerOrderNum } from "../Param/MerOrderNum";
import { Operation } from "../Param/Operation";
import { OrderNumber } from "../Param/OrderNumber";
import { ResponseParam } from "../Param/ResponseParam";
import { Sorter } from "../Param/Utils/Sorter";
import type { ResponseInterface } from "./ResponseInterface";

export class Response implements ResponseInterface {
	private params: Record<string, IParam> = {};
	private digest: string;
	private digest1: string;
	private gatewayKey: string;

	public static readonly RESPONSE_PARAMS = [
		ResponseEnum.EXPIRY,
		ResponseEnum.ACCODE,
		ResponseEnum.ACSRES,
		ResponseEnum.DAYTOCAPTURE,
		ResponseEnum.TOKENREGSTATUS,
	];

	constructor(
		operation: OperationEnum,
		ordernumber: string,
		merordernum: string,
		md: string,
		prcode: number,
		srcode: number,
		resulttext: string,
		digest: string,
		digest1: string,
		gatewayKey: string,
	) {
		this.params = {}; // Initialize params as empty object
		this.addParam(new Operation(operation));
		this.addParam(new OrderNumber(ordernumber));

		if (merordernum !== "") {
			this.addParam(new MerOrderNum(merordernum));
		}

		if (md !== "") {
			this.addParam(new Md(md));
		}

		this.addParam(new ResponseParam(String(prcode), ResponseEnum.PRCODE));
		this.addParam(new ResponseParam(String(srcode), ResponseEnum.SRCODE));

		if (resulttext !== "") {
			this.addParam(new ResponseParam(resulttext, ResponseEnum.RESULTTEXT));
		}

		this.digest = digest;
		this.digest1 = digest1;
		this.gatewayKey = gatewayKey;
	}

	public getDigest(): string {
		return this.digest;
	}

	public getDigest1(): string {
		return this.digest1;
	}

	public getGatewayKey(): string {
		return this.gatewayKey;
	}

	public getMerOrderNumber(): string | null {
		const param = this.params[Param.MERORDERNUM];
		return param ? String(param) : null;
	}

	public getMd(): string | null {
		const mdParam = this.params[Param.MD];
		if (!mdParam) return null;

		const explode = String(mdParam).split("|", 2);
		return explode[1] ?? null;
	}

	public getOrderNumber(): string {
		return String(this.params[Param.ORDERNUMBER]);
	}

	public getSrcode(): number {
		return Number.parseInt(String(this.params[ResponseEnum.SRCODE]), 10);
	}

	public getPrcode(): number {
		return Number.parseInt(String(this.params[ResponseEnum.PRCODE]), 10);
	}

	public getResultText(): string {
		return String(this.params[ResponseEnum.RESULTTEXT]);
	}

	public getUserParam1(): string | null {
		const param = this.params[Param.USERPARAM];
		// Need coverage for the line bellow but it's impossible to reach
		return param ? String(param) : null;
	}

	public hasError(): boolean {
		return (
			Number(this.params[ResponseEnum.PRCODE]?.getValue()) !== 0 ||
			Number(this.params[ResponseEnum.SRCODE]?.getValue()) !== 0
		);
	}

	public addParam(param: IParam): void {
		this.params[param.getParamName()] = param;
	}

	public getParam(paramName: string): IParam | null {
		return this.params[paramName] ?? null;
	}

	public getParams(): Record<string, IParam> {
		return this.params;
	}

	public sortParams(): void {
		this.params = Sorter.sortResponseParams(this.params);
	}
}
