import { Param } from "@/Enum/Param";
import type { IParam, Stringable } from "@/Param/IParam";
import { Sorter } from "@/Param/Utils/Sorter";
import { describe, expect, it, vi } from "vitest";

class FakeParam implements IParam {
	constructor(public value: string) { }

	getParamName(): string {
		return "fake";
	}
	getValue(): number | string | Stringable | Array<string | Stringable> {
		return this.value;
	}
	toString(): string {
		return this.value;
	}
}

describe("Sorter", () => {
	it("should sort request params in correct order", () => {
		const inputParams: Record<string, FakeParam> = {};
		for (const key of Sorter.REQUEST_PARAM_ORDER) {
			inputParams[key] = new FakeParam("someparam");
		}

		const sorted = Sorter.sortRequestParams(inputParams);
		expect(Object.keys(sorted)).toEqual(Sorter.REQUEST_PARAM_ORDER);
	});

	it("should sort response params in correct order", () => {
		const inputParams: Record<string, FakeParam> = {};
		for (const key of Sorter.RESPONSE_PARAM_ORDER) {
			inputParams[key] = new FakeParam("someparam");
		}

		const sorted = Sorter.sortResponseParams(inputParams);
		expect(Object.keys(sorted)).toEqual(Sorter.RESPONSE_PARAM_ORDER);
	});

	it("should place unknown keys last when sorting", () => {
		const originalOrder = [...Sorter.REQUEST_PARAM_ORDER];
		Sorter.REQUEST_PARAM_ORDER.splice(
			0,
			Sorter.REQUEST_PARAM_ORDER.length,
			Param.MERCHANTNUMBER,
		); // override

		const input: Record<string, FakeParam> = {
			UNKNOWN_KEY: new FakeParam("z-last"),
			[Param.MERCHANTNUMBER]: new FakeParam("a-first"),
		};

		const result = Sorter.sortRequestParams(input);
		const keys = Object.keys(result);

		expect(keys[0]).toBe(Param.MERCHANTNUMBER);
		expect(keys[1]).toBe("UNKNOWN_KEY");

		// restore
		Sorter.REQUEST_PARAM_ORDER.splice(
			0,
			Sorter.REQUEST_PARAM_ORDER.length,
			...originalOrder,
		);
	});

	it("should handle mixed Param and Response in sortResponseParams", () => {
		const allKeys = Sorter.RESPONSE_PARAM_ORDER.map((k) => k.toString());

		const input: Record<string, FakeParam> = {};
		for (const key of allKeys) {
			input[key] = new FakeParam("value");
		}

		const result = Sorter.sortResponseParams(input);
		expect(Object.keys(result)).toEqual(allKeys);
	});

	it("should handle non-string values in RESPONSE_PARAM_ORDER without error", () => {
		const mockParam = 1234 as unknown as Param;

		const originalOrder = [...Sorter.RESPONSE_PARAM_ORDER];
		Sorter.RESPONSE_PARAM_ORDER.push(mockParam);

		const params = { [mockParam]: new FakeParam("val") };

		const result = Sorter.sortResponseParams(params);
		const keys = Object.keys(result);

		expect(keys).toContain(mockParam.toString());

		// clean up
		Sorter.RESPONSE_PARAM_ORDER.splice(
			0,
			Sorter.RESPONSE_PARAM_ORDER.length,
			...originalOrder,
		);
	});

	it("should place keys not in order at the end (fallback to Infinity)", () => {
		const originalOrder = [...Sorter.REQUEST_PARAM_ORDER];
		Sorter.REQUEST_PARAM_ORDER.splice(
			0,
			Sorter.REQUEST_PARAM_ORDER.length,
			"a" as unknown as Param,
		); // custom test order

		const params = {
			a: new FakeParam("val1"),
			b: new FakeParam("val2"),
		};

		const result = Sorter.sortRequestParams(params);
		expect(Object.keys(result)).toEqual(["a", "b"]);

		// restore original
		Sorter.REQUEST_PARAM_ORDER.splice(
			0,
			Sorter.REQUEST_PARAM_ORDER.length,
			...originalOrder,
		);
	});
});
