import { describe, expect, it } from "vitest";
import { DepositFlag as DepositFlagEnum } from "@/Enum/DepositFlag";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { DepositFlag } from "@/Param/DepositFlag";
import { MerchantNumber } from "@/Param/MerchantNumber";
import { PaymentConfig } from "@/Config/PaymentConfig";
import { PaymentConfigProvider } from "@/Config/PaymentConfigProvider";

describe("PaymentConfigProvider", () => {
	it("creates and retrieves payment configs correctly", () => {
		const merchantNumber1 = new MerchantNumber("1234567890");
		const depositFlag1 = new DepositFlag(DepositFlagEnum.YES);

		const config1 = new PaymentConfig(
			"http://localhost",
			merchantNumber1,
			depositFlag1,
			"czk",
		);

		const merchantNumber2 = new MerchantNumber("1234567891");
		const depositFlag2 = new DepositFlag(DepositFlagEnum.NO);

		const config2 = new PaymentConfig(
			"http://local",
			merchantNumber2,
			depositFlag2,
			"eur",
		);

		const configProvider = new PaymentConfigProvider("czk");
		configProvider.addPaymentConfig(config1);
		configProvider.addPaymentConfig(config2);

		// Default gateway checks
		expect(configProvider.getUrl(configProvider.getDefaultGateway())).toBe(
			"http://localhost",
		);
		expect(
			String(
				configProvider.getMerchantNumber(configProvider.getDefaultGateway()),
			),
		).toBe(`${merchantNumber1.toString()}`);
		expect(
			String(configProvider.getDepositFlag(configProvider.getDefaultGateway())),
		).toBe(depositFlag1.toString());

		// Explicit gateway 'czk'
		expect(configProvider.getUrl("czk")).toBe("http://localhost");
		expect(String(configProvider.getMerchantNumber("czk"))).toBe(
			`${merchantNumber1.toString()}`,
		);
		expect(String(configProvider.getDepositFlag("czk"))).toBe(
			depositFlag1.toString(),
		);

		// Explicit gateway 'eur'
		expect(configProvider.getUrl("eur")).toBe("http://local");
		expect(String(configProvider.getMerchantNumber("eur"))).toBe(
			merchantNumber2.toString(),
		);
		expect(String(configProvider.getDepositFlag("eur"))).toBe(
			depositFlag2.toString(),
		);
	});

	it("throws when trying to access non-existing gateway config", () => {
		const configProvider = new PaymentConfigProvider();
		configProvider.setDefaultGateway("czk");

		const merchantNumber = new MerchantNumber("1234567890");
		const depositFlag = new DepositFlag(DepositFlagEnum.YES);

		configProvider.addPaymentConfig(
			new PaymentConfig("http://localhost", merchantNumber, depositFlag, "czk"),
		);

		expect(() => configProvider.getUrl("eur")).toThrowError(
			new InvalidArgumentException(
				'Config for key: "eur" not exist. Possible keys are: "czk"',
			),
		);
	});
});
