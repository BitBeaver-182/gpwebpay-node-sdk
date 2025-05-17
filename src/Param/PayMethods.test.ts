import { describe, expect, it } from "vitest";
import { Param } from "../Enum/Param";
import { PayMethod as PayMethodEnum } from "../Enum/PayMethod";
import { PayMethods } from "./PayMethods";

describe("PayMethods", () => {
	it("should create a PayMethods instance correctly with multiple methods", () => {
		const payMethods = new PayMethods(
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		);

		expect(payMethods.getValue()).toEqual([
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		]);
		expect(String(payMethods)).toBe("CRD,MPS,GPAY");
		expect(payMethods.getParamName()).toBe(Param.PAYMETHODS);
	});

	it("should only add each pay method once during creation", () => {
		const payMethods = new PayMethods(
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		);

		expect(payMethods.getValue()).toEqual([
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		]);
		expect(String(payMethods)).toBe("CRD,MPS,GPAY");
	});

	it("should allow adding new pay methods and ignore duplicates", () => {
		const payMethods = new PayMethods(
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		);

		expect(payMethods.getValue()).toEqual([
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
		]);
		expect(String(payMethods)).toBe("CRD,MPS,GPAY");

		payMethods.addMethod(PayMethodEnum.MASTERCARD_MOBILE);
		payMethods.addMethod(PayMethodEnum.CARD); // Will not be added again

		expect(payMethods.getValue()).toEqual([
			PayMethodEnum.CARD,
			PayMethodEnum.MASTERPASS,
			PayMethodEnum.GOOGLE_PAY,
			PayMethodEnum.MASTERCARD_MOBILE,
		]);
		expect(String(payMethods)).toBe("CRD,MPS,GPAY,MCM");
	});
});
