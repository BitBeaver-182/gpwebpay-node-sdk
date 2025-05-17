import { GPWebPayException } from "@/Exceptions/GPWebPayException";
import { describe, expect, it } from "vitest";

describe("GPWebPayException", () => {
	it("should create an exception with a message", () => {
		const error = new GPWebPayException("Something went wrong");

		expect(error).toBeInstanceOf(Error);
		expect(error).toBeInstanceOf(GPWebPayException);
		expect(error.message).toBe("Something went wrong");
		expect(error.name).toBe("GPWebPayException");
		expect(error.code).toBeUndefined();
	});

	it("should create an exception with a message and code", () => {
		const error = new GPWebPayException("Error with code", 42);

		expect(error.message).toBe("Error with code");
		expect(error.code).toBe(42);
	});

	it("should create an exception with no parameters", () => {
		const error = new GPWebPayException();

		expect(error.message).toBe("");
		expect(error.code).toBeUndefined();
		expect(error.name).toBe("GPWebPayException");
	});

	it("should maintain prototype chain", () => {
		const error = new GPWebPayException("Prototype test");

		expect(Object.getPrototypeOf(error)).toBe(GPWebPayException.prototype);
	});
});
