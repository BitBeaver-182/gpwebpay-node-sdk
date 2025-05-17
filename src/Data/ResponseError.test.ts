import { describe, expect, it } from "vitest";
import { ResponseError } from "./ResponseError";

describe("ResponseErrorTest", () => {
	it.each([
		{
			prcode: 28,
			srcode: 3002,
			lang: "cz",
			expectedMsg:
				"Neověřeno v 3D. Vydavatel karty nebo karta není zapojena do 3D",
		},
		{
			prcode: 28,
			srcode: 3000,
			lang: "en",
			expectedMsg:
				"Not Authenticated in 3D. Cardholder not authenticated in 3D.",
		},
		{
			prcode: 30,
			srcode: 1001,
			lang: "cz",
			expectedMsg: "Zamitnuto v autorizacnim centru, katra blokována",
		},
		{
			prcode: 30,
			srcode: 1001,
			lang: "en",
			expectedMsg: "Declined in AC, Card blocked",
		},
	])(
		"testCreate with prcode $prcode, srcode $srcode, lang $lang",
		({ prcode, srcode, lang, expectedMsg }) => {
			const error = new ResponseError(prcode, srcode);
			expect(error.getMessage(lang)).toBe(expectedMsg);
		},
	);

	it.each([
		{
			prcode: 999,
			srcode: 9999,
			lang: "cz",
			expectedMsg: "Technický problém v systému, kontaktujete obchodníka",
		}, // prcode and srcode not found
		{
			prcode: 28,
			srcode: 9999,
			lang: "cz",
			expectedMsg: "Technický problém v systému, kontaktujete obchodníka",
		}, // srcode not found
		{
			prcode: 999,
			srcode: 3002,
			lang: "cz",
			expectedMsg: "Technický problém v systému, kontaktujete obchodníka",
		}, // prcode not found
		{
			prcode: 28,
			srcode: 3002,
			lang: "xx",
			expectedMsg: "Technical problem in system, contact the merchant.",
		}, // lang not found
	])(
		"getMessage with prcode $prcode, srcode $srcode, lang $lang",
		({ prcode, srcode, lang, expectedMsg }) => {
			const error = new ResponseError(prcode, srcode);
			expect(error.getMessage(lang)).toBe(expectedMsg);
		},
	);

	it("should return the correct prcode", () => {
		const error = new ResponseError(28, 3002);
		expect(error.getPrcode()).toBe(28);
	});

	it("should return the correct srcode", () => {
		const error = new ResponseError(28, 3002);
		expect(error.getSrcode()).toBe(3002);
	});
});
