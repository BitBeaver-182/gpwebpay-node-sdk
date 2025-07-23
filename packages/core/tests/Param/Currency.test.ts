import { describe, expect, it } from "vitest";
import { Currency as CurrencyEnum } from "@/Enum/Currency";
import { Param } from "@/Enum/Param";
import { Currency } from "@/Param/Currency";

describe("Currency", () => {
	it("should create successfully with CZK", () => {
		const currency = new Currency(CurrencyEnum.CZK);

		expect(String(currency)).toBe("203");
		expect(currency.getValue()).toEqual(CurrencyEnum.CZK);
		expect(currency.getParamName()).toBe(Param.CURRENCY);
	});
});
