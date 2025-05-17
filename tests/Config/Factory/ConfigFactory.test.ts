import {
	privateKey2Path,
	privateKeyPath,
	publicKey2Path,
	publicKeyPath,
} from "@tests/helpers/keys";
import { describe, expect, it } from "vitest";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { ConfigFactory } from "@/Config/Factory/ConfigFactory";
import { PaymentConfigFactory } from "@/Config/Factory/PaymentConfigFactory";

const CZK = "czk";
const EUR = "eur";

describe("ConfigFactory", () => {
	const factory = new ConfigFactory(new PaymentConfigFactory());

	it("creates config from single set of parameters", () => {
		const config = factory.create({
			PRIVATE_KEY: privateKeyPath,
			PRIVATE_KEY_PASSPHRASE: "1234567",
			PUBLIC_KEY: publicKeyPath,
			URL: "https://test.3dsecure.gpwebpay.com/unicredit/order.do",
			MERCHANT_NUMBER: "123456789",
			DEPOSIT_FLAG: 1,
		});

		const configProvider = config.getPaymentConfigProvider();

		expect(configProvider.getUrl()).toBe(
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		);
		expect(String(configProvider.getMerchantNumber())).toBe("123456789");
		expect(String(configProvider.getDepositFlag())).toBe("1");

		const signerConfig = config.getSignerConfigProvider().getConfig();
		expect(signerConfig.getPrivateKey()).toBe(privateKeyPath);
		expect(signerConfig.getPrivateKeyPassword()).toBe("1234567");
		expect(signerConfig.getPublicKey()).toBe(publicKeyPath);
	});

	it("creates config from multiple gateways", () => {
		const config = factory.create(
			{
				[CZK]: {
					PRIVATE_KEY: privateKeyPath,
					PRIVATE_KEY_PASSPHRASE: "1234567",
					PUBLIC_KEY: publicKeyPath,
					URL: "https://test.3dsecure.gpwebpay.com/unicredit/order.do",
					MERCHANT_NUMBER: "123456789",
					DEPOSIT_FLAG: 1,
				},
				[EUR]: {
					PRIVATE_KEY: privateKey2Path,
					PRIVATE_KEY_PASSPHRASE: "12345678",
					PUBLIC_KEY: publicKey2Path,
					URL: "https://test.3dsecure.gpwebpay.com/unicredit/order.do",
					MERCHANT_NUMBER: "123456780",
					DEPOSIT_FLAG: 0,
				},
			},
			CZK,
		);

		const provider = config.getPaymentConfigProvider();

		// defaults
		expect(provider.getUrl()).toBe(
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		);
		expect(String(provider.getMerchantNumber())).toBe("123456789");
		expect(String(provider.getDepositFlag())).toBe("1");

		// czk
		expect(provider.getUrl(CZK)).toBe(
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		);
		expect(String(provider.getMerchantNumber(CZK))).toBe("123456789");
		expect(String(provider.getDepositFlag(CZK))).toBe("1");

		// eur
		expect(provider.getUrl(EUR)).toBe(
			"https://test.3dsecure.gpwebpay.com/unicredit/order.do",
		);
		expect(String(provider.getMerchantNumber(EUR))).toBe("123456780");
		expect(String(provider.getDepositFlag(EUR))).toBe("0");

		const signerDefault = config.getSignerConfigProvider().getConfig();
		expect(signerDefault.getPrivateKey()).toBe(privateKeyPath);
		expect(signerDefault.getPrivateKeyPassword()).toBe("1234567");
		expect(signerDefault.getPublicKey()).toBe(publicKeyPath);

		const signerCzk = config.getSignerConfigProvider().getConfig(CZK);
		expect(signerCzk.getPrivateKey()).toBe(privateKeyPath);
		expect(signerCzk.getPrivateKeyPassword()).toBe("1234567");
		expect(signerCzk.getPublicKey()).toBe(publicKeyPath);

		const signerEur = config.getSignerConfigProvider().getConfig(EUR);
		expect(signerEur.getPrivateKey()).toBe(privateKey2Path);
		expect(signerEur.getPrivateKeyPassword()).toBe("12345678");
		expect(signerEur.getPublicKey()).toBe(publicKey2Path);
	});

	it("throws if default gateway is missing from config", () => {
		expect(() => {
			factory.create(
				{
					czk: {
						PRIVATE_KEY: privateKeyPath,
						PRIVATE_KEY_PASSPHRASE: "1234567",
						PUBLIC_KEY: publicKeyPath,
						URL: "https://test.3dsecure.gpwebpay.com/unicredit/order.do",
						MERCHANT_NUMBER: "123456789",
						DEPOSIT_FLAG: 1,
					},
					eur: {
						PRIVATE_KEY: privateKey2Path,
						PRIVATE_KEY_PASSPHRASE: "12345678",
						PUBLIC_KEY: publicKey2Path,
						URL: "https://test.3dsecure.gpwebpay.com/unicredit/order.do",
						MERCHANT_NUMBER: "123456780",
						DEPOSIT_FLAG: 0,
					},
				},
				"wrong_default_gateway",
			);
		}).toThrow(InvalidArgumentException);
	});
});
