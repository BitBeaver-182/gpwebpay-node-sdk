import { faker } from "@faker-js/faker";
import { generateIntegerString } from "@tests/helpers/numeric";
import { describe, expect, test } from "vitest";
import { Param } from "../Enum/Param";
import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import { MerOrderNum } from "./MerOrderNum";

describe("MerOrderNum", () => {
	test("should successfully create MerOrderNum param", () => {
		const merOrderNum = new MerOrderNum(123455);
		expect(merOrderNum.getValue()).toBe(123455);
		expect(String(merOrderNum)).toBe("123455");
		expect(merOrderNum.getParamName()).toBe(Param.MERORDERNUM);
	});

	test.each([["1.0"], [10.01]])(
		"should throw exception for invalid value %s",
		(value) => {
			expect(() => {
				new MerOrderNum(value);
			}).toThrow(InvalidArgumentException);
			expect(() => {
				new MerOrderNum(value);
			}).toThrow(`MERORDERNUM must be integer "${value}" given.`);
		},
	);

	test("should throw exception for too long value", () => {
		const longValue = generateIntegerString(31);
		expect(() => {
			new MerOrderNum(longValue);
		}).toThrow(InvalidArgumentException);
		expect(() => {
			new MerOrderNum(longValue);
		}).toThrow(`MERORDERNUM max. length is 30! "${longValue.length}" given.`);
	});

	test("should throw exception for invalid scalar value", () => {
		const invalidString = faker.string.alpha({ length: 4 });
		expect(() => {
			new MerOrderNum(invalidString);
		}).toThrow(InvalidArgumentException);
		expect(() => {
			new MerOrderNum(invalidString);
		}).toThrow(`MERORDERNUM must be integer "${invalidString}" given.`);
	});
});
