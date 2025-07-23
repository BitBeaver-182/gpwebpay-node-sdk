import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { Description } from "@/Param/Description";

describe("Description", () => {
	it("should create successfully", () => {
		const description = new Description("description");

		expect(String(description)).toBe("description");
		expect(description.getValue()).toBe("description");
		expect(description.getParamName()).toBe(Param.DESCRIPTION);
	});

	it("should throw if text exceeds 255 characters", () => {
		const longText = faker.string.alphanumeric({ length: 256 });
		expect(() => new Description(longText)).toThrowError(
			new InvalidArgumentException(
				`DESCRIPTION max. length is 255! "${longText.length}" given.`,
			),
		);
	});
});
