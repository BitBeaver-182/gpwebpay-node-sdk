import { privateKeyPath } from "@tests/helpers/keys";
import { describe, expect, it } from "vitest";
import { PrivateKey } from "./PrivateKey";

describe("PrivateKey", () => {
	it("creates a private key successfully", () => {
		new PrivateKey(privateKeyPath, "1234567");
		// No assertions: just expect not to throw
	});

	it("returns same key object on repeated getKey() calls", () => {
		const privateKey = new PrivateKey(privateKeyPath, "1234567");

		const res1 = privateKey.getKey();
		const res2 = privateKey.getKey();

		expect(res1).toBe(res2); // should return cached object
	});

	it("throws on incorrect password", () => {
		const invalidPassword = "wrongpass";

		const createWithWrongPass = () => {
			const key = new PrivateKey(privateKeyPath, invalidPassword);
			key.getKey(); // should throw
		};

		expect(createWithWrongPass).toThrowError(
			`"${privateKeyPath}" is not a valid PEM private key (or password is incorrect).`,
		);
	});
});
