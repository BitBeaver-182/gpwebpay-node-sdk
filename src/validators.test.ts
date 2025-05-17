import { describe, expect, it } from "vitest";
import { InvalidArgumentException } from "../src/Exceptions/InvalidArgumentException";
import {
	assertIsEmail,
	assertIsInteger,
	assertLength,
	assertMaxLength,
	assertUrl,
} from "./validators";

describe("assertIsInteger", () => {
	it("should pass validation for valid integer values", () => {
		expect(() => assertIsInteger(10, "TEST")).not.toThrow();
		expect(() => assertIsInteger("10", "TEST")).not.toThrow();
		expect(() => assertIsInteger(10000, "TEST")).not.toThrow();
	});

	it("should throw InvalidArgumentException for invalid integer values", () => {
		expect(() => assertIsInteger("10.0", "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(10.01, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger("asdf", "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(null, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(undefined, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger("", "TEST")).toThrow(InvalidArgumentException);
		expect(() => assertIsInteger(" ", "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(Number.NaN, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(Number.POSITIVE_INFINITY, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsInteger(-10.5, "TEST")).toThrow(
			InvalidArgumentException,
		);
	});
});

describe("assertMaxLength", () => {
	it("should not throw if the value length is within the maximum length", () => {
		expect(() => assertMaxLength("test", 4, "TEST")).not.toThrow();
		expect(() => assertMaxLength("test", 5, "TEST")).not.toThrow();
		expect(() => assertMaxLength(123, 3, "TEST")).not.toThrow();
		expect(() => assertMaxLength(123, 4, "TEST")).not.toThrow();
		expect(() => assertMaxLength("", 0, "TEST")).not.toThrow();
	});

	it("should throw InvalidArgumentException if the value length exceeds the maximum length", () => {
		expect(() => assertMaxLength("test", 3, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertMaxLength(1234, 3, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertMaxLength("longer string", 5, "TEST")).toThrow(
			InvalidArgumentException,
		);
	});
});

describe("assertLength", () => {
	it("should not throw if the value length matches the specified length", () => {
		expect(() => assertLength("test", 4, "TEST")).not.toThrow();
		expect(() => assertLength(123, 3, "TEST")).not.toThrow();
		expect(() => assertLength("", 0, "TEST")).not.toThrow();
	});

	it("should throw InvalidArgumentException if the value length does not match the specified length", () => {
		expect(() => assertLength("test", 3, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertLength("test", 5, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertLength(123, 2, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertLength(123, 4, "TEST")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertLength("", 1, "TEST")).toThrow(InvalidArgumentException);
	});
});

describe("assertIsEmail", () => {
	it("should not throw if the value is a valid email address", () => {
		expect(() => assertIsEmail("simple@example.com")).not.toThrow();
		expect(() => assertIsEmail("very.common@example.com")).not.toThrow();
		expect(() =>
			assertIsEmail("disposable.style.email.with+symbol@example.com"),
		).not.toThrow();
		expect(() =>
			assertIsEmail("other.email-with-hyphen@example.com"),
		).not.toThrow();
		expect(() =>
			assertIsEmail("fully-qualified-domain@example.com"),
		).not.toThrow();
		expect(() =>
			assertIsEmail("user.name+tag+sorting@example.com"),
		).not.toThrow();
		expect(() => assertIsEmail("x@example.com")).not.toThrow();
		expect(() =>
			assertIsEmail("example-indeed@strange-example.com"),
		).not.toThrow();
		expect(() => assertIsEmail("example@s.example")).not.toThrow();
		expect(() => assertIsEmail('" "@example.org')).not.toThrow();
		expect(() => assertIsEmail('"john..doe"@example.org')).not.toThrow();
	});

	it("should throw InvalidArgumentException if the value is not a valid email address", () => {
		expect(() => assertIsEmail("Abc.example.com")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsEmail("A@b@c@example.com")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsEmail('a"b(c)d,e:f;g<h>i[j\\k]l@example.com')).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsEmail('just"not"right@example.com')).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertIsEmail('this is"not\\allowed@example.com')).toThrow(
			InvalidArgumentException,
		);
		expect(() =>
			assertIsEmail('this\\ still\\"not\\\\allowed@example.com'),
		).toThrow(InvalidArgumentException);
		expect(() =>
			assertIsEmail(
				"1234567890123456789012345678901234567890123456789012345678901234+x@example.com",
			),
		).toThrow(InvalidArgumentException);
	});
});

describe("assertUrl", () => {
	it("should not throw if the value is a valid URL", () => {
		expect(() => assertUrl("http://example.com")).not.toThrow();
		expect(() => assertUrl("https://例え.テスト")).not.toThrow();
		expect(() =>
			assertUrl("ftp://user:pass@host.com:21/path/to/file"),
		).not.toThrow();
		expect(() => assertUrl("http://xn--fsq.xn--0zwm56d")).not.toThrow();
		expect(() => assertUrl("http://example.com/路径/文件")).not.toThrow();
		expect(() =>
			assertUrl("https://example.com/path?query=値&lang=日本語"),
		).not.toThrow();
		expect(() => assertUrl("https://example.com/#フラグメント")).not.toThrow();
		expect(() => assertUrl("http://user@例え.テスト:8080")).not.toThrow();
		expect(() => assertUrl("https://مثال.إختبار")).not.toThrow();
		expect(() => assertUrl("http://[2001:db8::1]/path")).not.toThrow();
	});

	it("should throw InvalidArgumentException if the value is not a valid URL", () => {
		expect(() => assertUrl("http:///example.com")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("http://exa mple.com")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("http://example.com/pa th")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("ftp://user:pa:ss@host.com")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("http://example.com:-80/")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("http://example.com:999999/")).toThrow(
			InvalidArgumentException,
		);
		expect(() => assertUrl("://example.com")).toThrow(InvalidArgumentException);
		expect(() => assertUrl("http://")).toThrow(InvalidArgumentException);
		expect(() => assertUrl("example.com")).toThrow(InvalidArgumentException);
	});
});
