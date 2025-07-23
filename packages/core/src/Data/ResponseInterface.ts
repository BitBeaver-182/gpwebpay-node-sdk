import type { IParam } from "../Param/IParam";

export interface ResponseInterface {
	// Define interface constants
	getParams(): Record<string, IParam>;
	getDigest(): string;
	hasError(): boolean;
	getDigest1(): string;
	getMerOrderNumber(): string | null;
	getMd(): string | null;
	getGatewayKey(): string;
	getOrderNumber(): string;
	getSrcode(): number;
	getPrcode(): number;
	getResultText(): string;
	getUserParam1(): string | null;

	/**
	 * Sorting params order by documentation
	 */
	sortParams(): void;
}
