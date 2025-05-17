import { describe, expect, it } from "vitest";
import { Param } from "../Enum/Param";
import { PayMethod } from "../Enum/PayMethod";
import { DisablePayMethod } from "./DisablePayMethod";

describe("DisablePayMethod", () => {
	it("should create successfully with CARD pay method", () => {
		const payMethod = new DisablePayMethod(PayMethod.CARD);

		expect(payMethod.getValue()).toEqual(PayMethod.CARD);
		expect(String(payMethod)).toBe("CRD");
		expect(payMethod.getParamName()).toBe(Param.DISABLEPAYMETHOD);
	});
});
