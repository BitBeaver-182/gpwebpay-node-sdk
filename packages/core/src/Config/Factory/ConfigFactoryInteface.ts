import type { DepositFlag } from "../../Enum/DepositFlag";
import type { Config } from "../Config";

export interface ConfigFactoryInterface {
	/**
	 * @param {ConfigParams} params
	 * @param {string} [defaultGateway='default']
	 * @returns {Config}
	 */
	create(params: ConfigParams, defaultGateway?: string): Config;
}

export interface GatewayConfig {
	URL: string;
	MERCHANT_NUMBER: string;
	DEPOSIT_FLAG: DepositFlag;
	PRIVATE_KEY: string;
	PRIVATE_KEY_PASSPHRASE: string;
	PUBLIC_KEY: string;
	RESPONSE_URL?: string;
}

export type ConfigParams = GatewayConfig | Record<string, GatewayConfig>;
