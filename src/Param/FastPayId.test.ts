import { describe, expect, it } from "vitest";
import { Param } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import { FastPayId } from "./FastPayId";

describe("FastPayId", () => {
	it("should create with valid integer", () => {
		const fastPayId = new FastPayId(123455);

		expect(fastPayId.getValue()).toBe(123455);
		expect(String(fastPayId)).toBe("123455");
		expect(fastPayId.getParamName()).toBe(Param.FASTPAYID);
	});

	const invalidValues = ["1.0", 10.01];
	for (const value of invalidValues) {
		it(`should throw for non-integer numeric value: ${value}`, () => {
			expect(() => new FastPayId(value)).toThrowError(
				new InvalidArgumentException(
					`FASTPAYID must be integer "${value}" given.`,
				),
			);
		});
	}

	it("should throw for too long value", () => {
		const longValue = "1234567890123456";

		expect(() => new FastPayId(longValue)).toThrowError(
			new InvalidArgumentException('FASTPAYID max. length is 15! "16" given.'),
		);
	});
});
