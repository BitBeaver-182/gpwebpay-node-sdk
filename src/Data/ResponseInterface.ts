/**
 * This file is part of the GPWebPay package.
 *
 * (c) Ondra Votava <ondra@votava.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IParam } from "../Param/IParam";

// Equivalent namespace in TypeScript would be a module or file path

// Assuming the IParam interface exists in a relative path

/**
 * ResponseInterface for GPWebPay integration
 */
export interface ResponseInterface {
  // Constants in interfaces in TypeScript
  readonly PRCODE: 'PRCODE';
  readonly SRCODE: 'SRCODE';
  readonly RESULTTEXT: 'RESULTTEXT';
  readonly EXPIRY: 'EXPIRY';
  readonly ACSRES: 'ACSRES';
  readonly ACCODE: 'ACCODE';
  readonly DAYTOCAPTURE: 'DAYTOCAPTURE';
  readonly TOKENREGSTATUS: 'TOKENREGSTATUS';
  readonly DIGEST1: 'DIGEST1';
  readonly RESPONSE_PARAMS: ReadonlyArray<string>;

  /**
   * Returns all parameters
   * @returns Record of parameters by their name
   */
  getParams(): Record<string, IParam>;

  /**
   * Returns the digest
   * @returns The digest string
   */
  getDigest(): string;

  /**
   * Checks if the response contains an error
   * @returns True if there's an error
   */
  hasError(): boolean;

  /**
   * Returns digest1
   * @returns The digest1 string
   */
  getDigest1(): string;

  /**
   * Returns merchant order number
   * @returns The merchant order number or null
   */
  getMerOrderNumber(): string | null;

  /**
   * Returns MD
   * @returns The MD value or null
   */
  getMd(): string | null;

  /**
   * Returns gateway key
   * @returns The gateway key
   */
  getGatewayKey(): string;

  /**
   * Returns order number
   * @returns The order number
   */
  getOrderNumber(): string;

  /**
   * Returns SR code
   * @returns The SR code
   */
  getSrcode(): number;

  /**
   * Returns PR code
   * @returns The PR code
   */
  getPrcode(): number;

  /**
   * Returns result text
   * @returns The result text
   */
  getResultText(): string;

  /**
   * Returns user parameter 1
   * @returns User parameter 1 or null
   */
  getUserParam1(): string | null;

  /**
   * Sorting params order by documentation
   */
  sortParams(): void;
}

// Implementation of the static constants for the interface
// Since TypeScript interfaces can't have static properties directly
export const ResponseInterfaceConstants = {
  PRCODE: 'PRCODE',
  SRCODE: 'SRCODE',
  RESULTTEXT: 'RESULTTEXT',
  EXPIRY: 'EXPIRY',
  ACSRES: 'ACSRES',
  ACCODE: 'ACCODE',
  DAYTOCAPTURE: 'DAYTOCAPTURE',
  TOKENREGSTATUS: 'TOKENREGSTATUS',
  DIGEST1: 'DIGEST1',
  RESPONSE_PARAMS: [
    'EXPIRY',
    'ACCODE',
    'ACSRES',
    'DAYTOCAPTURE',
    'TOKENREGSTATUS',
  ] as const
} as const;