import { faker } from "@faker-js/faker";
import { generateIntegerString } from "@tests/helpers/numeric";
import { describe, expect, it, test } from "vitest";
import { Param } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import { OrderNumber } from "./OrderNumber";

describe("OrderNumber", () => {
	it("should create an OrderNumber instance correctly", () => {
		const orderNumber = new OrderNumber(123455);

		expect(orderNumber.getValue()).toBe(123455);
		expect(String(orderNumber)).toBe("123455");
		expect(orderNumber.getParamName()).toBe(Param.ORDERNUMBER);
	});

	test.each([["1.0"], [10.01]])(
		"should throw InvalidArgumentException for invalid value: %s",
		(value) => {
			expect(() => new OrderNumber(value)).toThrowError(
				InvalidArgumentException,
			);
			expect(() => new OrderNumber(value)).toThrowError(
				`ORDERNUMBER must be integer "${value}" given.`,
			);
		},
	);

	it("should throw InvalidArgumentException for a too long value", () => {
		const longValue = generateIntegerString(16);
		expect(() => new OrderNumber(longValue)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new OrderNumber(longValue)).toThrowError(
			`ORDERNUMBER max. length is 15! "${longValue.length}" given.`,
		);
	});

	it("should throw InvalidArgumentException for an invalid scalar value", () => {
		const invalidValue = faker.string.alphanumeric({ length: 4 });
		expect(() => new OrderNumber(invalidValue)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new OrderNumber(invalidValue)).toThrowError(
			`ORDERNUMBER must be integer "${invalidValue}" given.`,
		);
	});
});
