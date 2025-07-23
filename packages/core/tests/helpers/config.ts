import { ConfigFactory } from "@/Config/Factory/ConfigFactory";
import { PaymentConfigFactory } from "@/Config/Factory/PaymentConfigFactory";
import {
	privateKey2Path,
	privateKeyPath,
	publicKey2Path,
	publicKeyPath,
} from "./keys";
import type {
	ConfigParams,
	GatewayConfig,
} from "@/Config/Factory/ConfigFactoryInteface";

export const DEFAULT_GATEWAY = "czk";
export const RESPONSE_URL_EXAMPLE = "http://example.com/payment-gateway";

const configParams: ConfigParams = {
	czk: {
		[ConfigFactory.PRIVATE_KEY]: privateKeyPath,
		[ConfigFactory.PRIVATE_KEY_PASSPHRASE]: "1234567",
		[ConfigFactory.PUBLIC_KEY]: publicKeyPath,
		[ConfigFactory.URL]:
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		[ConfigFactory.MERCHANT_NUMBER]: "123456789",
		[ConfigFactory.DEPOSIT_FLAG]: 1,
	},
	eur: {
		[ConfigFactory.PRIVATE_KEY]: privateKey2Path,
		[ConfigFactory.PRIVATE_KEY_PASSPHRASE]: "12345678",
		[ConfigFactory.PUBLIC_KEY]: publicKey2Path,
		[ConfigFactory.URL]:
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		[ConfigFactory.MERCHANT_NUMBER]: "123456780",
		[ConfigFactory.DEPOSIT_FLAG]: 1,
	},
};

export const createConfig = (defaultGateway = DEFAULT_GATEWAY) => {
	const factory = new ConfigFactory(new PaymentConfigFactory());
	return factory.create(configParams, defaultGateway);
};

export const createConfigWithResponseUrl = (
	defaultGateway = DEFAULT_GATEWAY,
) => {
	const factory = new ConfigFactory(new PaymentConfigFactory());
	const configWithUrl = Object.entries(configParams).reduce(
		(acc, [key, config]) => {
			acc[key] = {
				...config,
				RESPONSE_URL: RESPONSE_URL_EXAMPLE,
			};

			return acc;
		},
		{} as Record<string, GatewayConfig>,
	);
	return factory.create(configWithUrl, defaultGateway);
};
