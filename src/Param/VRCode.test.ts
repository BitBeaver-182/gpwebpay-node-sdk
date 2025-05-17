import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { VRCode } from "./VRCode";

describe("VRCode", () => {
	it("should create a VRCode instance correctly", () => {
		const code = new VRCode("vrcode");

		expect(String(code)).toBe("vrcode");
		expect(code.getValue()).toBe("vrcode");
		expect(code.getParamName()).toBe(Param.VRCODE);
	});

	it("should throw InvalidArgumentException for a long VRCode", () => {
		const invalidString = faker.string.alphanumeric({ length: 60 });
		expect(() => new VRCode(invalidString)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new VRCode(invalidString)).toThrowError(
			`VRCODE max. length is 48! "${invalidString.length}" given.`,
		);
	});
});
