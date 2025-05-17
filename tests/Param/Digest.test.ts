import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { Digest } from "@/Param/Digest";

describe("Digest", () => {
	it("should create successfully", () => {
		const digest = new Digest("digest");

		expect(String(digest)).toBe("digest");
		expect(digest.getValue()).toBe("digest");
		expect(digest.getParamName()).toBe(Param.DIGEST);
	});

	it("should throw if text exceeds 2000 characters", () => {
		const longText = faker.string.alphanumeric({ length: 2001 });
		expect(() => new Digest(longText)).toThrowError(
			new InvalidArgumentException(
				`DIGEST max. length is 2000! "${longText.length}" given.`,
			),
		);
	});
});
