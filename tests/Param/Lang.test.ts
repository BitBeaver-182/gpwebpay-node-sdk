import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { Lang } from "@/Param//Lang";

describe("Lang", () => {
	test("should successfully create Lang param", () => {
		const lang = new Lang("cs");
		expect(lang.getValue()).toBe("cs");
		expect(String(lang)).toBe("cs");
		expect(lang.getParamName()).toBe(Param.LANG);
	});

	test("should throw exception for too long language code", () => {
		const longtext = faker.string.alphanumeric({ length: 300 });
		expect(() => {
			new Lang(longtext);
		}).toThrow(InvalidArgumentException);
		expect(() => {
			new Lang(longtext);
		}).toThrow(`LANG max. length is 2! "${longtext.length}" given.`);
	});
});
