import { Param } from "@/Enum/Param";
import { InvalidArgumentException } from "@/Exceptions/InvalidArgumentException";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ResponseUrl } from "./ResponseUrl";

describe("ResponseUrl", () => {
	it("should create a ResponseUrl instance correctly", () => {
		const responseUrl = new ResponseUrl("http://test.com");

		expect(String(responseUrl)).toBe("http://test.com");
		expect(responseUrl.getValue()).toBe("http://test.com");
		expect(responseUrl.getParamName()).toBe(Param.RESPONSE_URL);
	});

	it("should throw InvalidArgumentException for an invalid URL", () => {
		expect(() => new ResponseUrl("tohlenenniurl")).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new ResponseUrl("tohlenenniurl")).toThrowError(
			"URL is Invalid.",
		);
	});

	it("should throw InvalidArgumentException for a long URL", () => {
		const longUrl = `http://${faker.string.alpha({ length: 300 })}`;
		expect(() => new ResponseUrl(longUrl)).toThrowError(
			InvalidArgumentException,
		);
		expect(() => new ResponseUrl(longUrl)).toThrowError(
			`URL max. length is 300! "${longUrl.length}" given.`,
		);
	});
});
