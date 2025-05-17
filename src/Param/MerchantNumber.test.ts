import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Param } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import { MerchantNumber } from "./MerchantNumber";

describe("MerchantNumber", () => {
	it("should create a MerchantNumber instance correctly", () => {
		const merchantNumber = new MerchantNumber("FA12345678");

		expect(String(merchantNumber)).toBe("FA12345678");
		expect(merchantNumber.getValue()).toBe("FA12345678");
		expect(merchantNumber.getParamName()).toBe(Param.MERCHANTNUMBER);
	});

	it("should throw InvalidArgumentException for a long merchant number", () => {
		const invalidString = faker.string.alphanumeric({ length: 300 });
		expect(() => new MerchantNumber(invalidString)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new MerchantNumber(invalidString)).toThrowError(
			`MERCHANTNUMBER max. length is 10! "${invalidString.length}" given.`,
		);
	});
});
