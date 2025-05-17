import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { AddInfo } from "@/Param/AddInfo";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";


describe("AddInfo", () => {
	it("should create successfully with valid XML string", () => {
		const xml = "<xml></xml>";
		const addInfo = new AddInfo(xml);

		expect(addInfo.getValue()).toBe(xml);
		expect(String(addInfo)).toBe(xml);
	});

	it("should throw InvalidArgumentException if string exceeds 24000 characters", () => {
		const xml = `<xml>${faker.string.alphanumeric({ length: 30000 })}</xml>`;
		const expectedLength = xml.length;

		expect(() => new AddInfo(xml)).toThrowError(
			new InvalidArgumentException(
				`ADDINFO max. length is 24000! "${expectedLength}" given.`,
			),
		);
	});
});
