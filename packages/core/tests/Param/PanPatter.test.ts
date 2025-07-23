import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { PanPattern } from "@/Param/PanPattern";

describe("PanPattern", () => {
	it("should create a PanPattern instance correctly", () => {
		const panPattern = new PanPattern("panPattern");

		expect(String(panPattern)).toBe("panPattern");
		expect(panPattern.getValue()).toBe("panPattern");
		expect(panPattern.getParamName()).toBe(Param.PANPATTERN);
	});

	it("should throw InvalidArgumentException for a long pan pattern", () => {
		const invalidText = faker.string.alphanumeric({ length: 256 });
		expect(() => new PanPattern(invalidText)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new PanPattern(invalidText)).toThrowError(
			`PANPATTERN max. length is 255! "${invalidText.length}" given.`,
		);
	});
});
