import { AmountInPennies } from "@/Param/AmountInPennies";
import { describe, expect, it } from "vitest";

describe("AmountInPennies", () => {
	it("should create successfully with integer value", () => {
		const amount = new AmountInPennies(100000);

		expect(amount.getValue()).toBe(100000);
		expect(String(amount)).toBe("100000");
	});
});
