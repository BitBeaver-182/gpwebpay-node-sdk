/**
 * This file is part of the GPWebPay package.
 *
 * (c) Ondra Votava <ondra@votava.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * TypeScript equivalent of PHP's Stringable interface
 */
export interface Stringable {
	toString(): string;
}

/**
 * Interface for parameters in GPWebPay integration
 */
export interface IParam extends Stringable {
	/**
	 * Returns the parameter name
	 * @returns The parameter name
	 */
	getParamName(): string;

	/**
	 * Returns the parameter value
	 * @returns The parameter value which can be various types
	 */
	getValue(): number | string | Stringable | Array<string | Stringable>;
}
