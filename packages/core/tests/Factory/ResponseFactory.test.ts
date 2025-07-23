import { Param } from "@/Enum/Param";
import { Response as ResponseEnum } from "@/Enum/Response";
import { createConfig } from "@tests/helpers/config";
import { describe, expect, it } from "vitest";
import { ResponseFactory } from "@/Factory/ResponseFactory";

const config = createConfig();
const createResponseFactory = () => {
	return new ResponseFactory(config.getPaymentConfigProvider());
};

describe("ResponseFactory", () => {
	it("should create response with full parameters correctly", () => {
		const factory = createResponseFactory();
		const response = factory.create(getFullParams());

		expect(response.getMd()).toBe("sometext");
		expect(response.getOrderNumber()).toBe("123456");
		expect(response.getMerOrderNumber()).toBe("12345678");
		expect(response.getPrcode()).toBe(0);
		expect(response.getSrcode()).toBe(0);
		expect(response.getResultText()).toBe("resulttext");
		expect(response.getGatewayKey()).toBe("czk");
		expect(response.getParams()[Param.TOKEN].getValue()).toBe("XXXX");
		expect(response.hasError()).toBe(false);
	});

	it("should create error response correctly", () => {
		const factory = createResponseFactory();
		const response = factory.create(getErrorParams());

		expect(response.getMd()).toBeNull();
		expect(response.getOrderNumber()).toBe("123456");
		expect(response.getMerOrderNumber()).toBeNull();
		expect(response.getPrcode()).toBe(14);
		expect(response.getSrcode()).toBe(0);
		expect(response.getResultText()).toBe("Duplicate order number");
		expect(response.getGatewayKey()).toBe("czk");
		expect(response.hasError()).toBe(true);
	});

	it("should handle default value for getIntValue when parameter is missing", () => {
		const factory = createResponseFactory();
		const params = { ...getFullParams() };
		delete params[ResponseEnum.PRCODE]; // Remove PRCODE to test default value
		const response = factory.create(params);

		expect(response.getPrcode()).toBe(1000); // Verify default value is used
	});
});

/**
 * Simulates full parameters response
 */
function getFullParams(): Partial<Record<Param | ResponseEnum, string>> {
	return {
		[Param.OPERATION]: "CREATE_ORDER",
		[Param.ORDERNUMBER]: "123456",
		[Param.MERORDERNUM]: "12345678",
		[Param.MD]: "czk|sometext",
		[ResponseEnum.PRCODE]: "0",
		[ResponseEnum.SRCODE]: "0",
		[ResponseEnum.RESULTTEXT]: "resulttext",
		[Param.DIGEST]: "hash1",
		[ResponseEnum.DIGEST1]: "hash2",
		[Param.TOKEN]: "XXXX",
	};
}

/**
 * Simulates error response with missing MD, MERORDERNUM
 */
function getErrorParams(): Partial<Record<Param | ResponseEnum, string>> {
	return {
		[Param.OPERATION]: "CREATE_ORDER",
		[Param.ORDERNUMBER]: "123456",
		[Param.MD]: "czk",
		[ResponseEnum.PRCODE]: "14",
		[ResponseEnum.SRCODE]: "0",
		[ResponseEnum.RESULTTEXT]: "Duplicate order number",
		[Param.DIGEST]: "hash1",
		[ResponseEnum.DIGEST1]: "hash2",
	};
}
