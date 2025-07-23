import type { IParam } from "../Param/IParam";

export interface RequestInterface {
	/**
	 * Return all parameters
	 * @returns {Record<string, string>}
	 */
	getParams(): Record<string, string>;

	/**
	 * @param param
	 */
	setParam(param: IParam): void;

	/**
	 * Return only parameters that are included in digest
	 * @returns {Record<string, string>}
	 */
	getDigestParams(): Record<string, string>;

	/**
	 * @param asPost send with http POST method
	 * @returns {string}
	 */
	getRequestUrl(asPost?: boolean): string;

	/**
	 * Sorting Param by documentation
	 */
	sortParams(): void;
}
