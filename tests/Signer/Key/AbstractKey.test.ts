import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InvalidArgumentException } from "../../../src/Exceptions/InvalidArgumentException";
import { AbstractKey } from "../../../src/Signer/Key/AbstractKey";
import type { KeyObject } from "node:crypto";
import { createPrivateKey } from "node:crypto";
import * as fs from "node:fs";
import { SignerException } from "../../../src/Exceptions/SignerException";

// Mock fs module
vi.mock("node:fs", () => ({
	existsSync: vi.fn(),
	readFileSync: vi.fn(),
}));

// Mock crypto module
vi.mock("node:crypto", () => ({
	KeyObject: class {},
	createPrivateKey: vi.fn(),
	createPublicKey: vi.fn(),
}));

// Create a concrete implementation of AbstractKey for testing
class ConcreteKey extends AbstractKey {
	protected createKey: () => KeyObject; // Override with a function type

	constructor(file: string, createKeyImpl: () => KeyObject) {
		// Add constructor parameter
		super(file);
		this.createKey = createKeyImpl;
	}
}

describe("AbstractKey", () => {
	const testFilePath = "/path/to/key.pem";

	beforeEach(() => {
		// Default behavior for mocks
		vi.mocked(fs.existsSync).mockReturnValue(true);
		vi.mocked(fs.readFileSync).mockReturnValue("mock-key-content");
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("constructor", () => {
		it("should create an instance with a valid file path", () => {
			// Arrange & Act
			const key = new ConcreteKey(testFilePath, () => ({}) as KeyObject);

			// Assert
			expect(key).toBeInstanceOf(AbstractKey);
			expect(fs.existsSync).toHaveBeenCalledWith(testFilePath);
		});

		it("should throw InvalidArgumentException if file does not exist", () => {
			// Arrange
			vi.mocked(fs.existsSync).mockReturnValue(false);

			// Act & Assert
			expect(
				() => new ConcreteKey(testFilePath, () => ({}) as KeyObject),
			).toThrow(InvalidArgumentException);
			expect(fs.existsSync).toHaveBeenCalledWith(testFilePath);
		});
	});

	describe("getKey", () => {
		it("should return a key object", () => {
			// Arrange
			const key = new ConcreteKey(testFilePath, () => ({}) as KeyObject);

			// Act
			const result = key.getKey();

			// Assert
			expect(result).toBeDefined();
		});

		it("should cache the key object on subsequent calls", () => {
			// Arrange
			let createKeyCallCount = 0;
			const mockCreateKey = () => {
				createKeyCallCount++;
				return {} as KeyObject;
			};
			const key = new ConcreteKey(testFilePath, mockCreateKey);

			// Act
			const firstResult = key.getKey();
			const secondResult = key.getKey();

			// Assert
			expect(createKeyCallCount).toBe(1);
			expect(firstResult).toBe(secondResult);
		});

		it("should throw SignerException when file cannot be read by getContent", () => {
			// Arrange
			vi.mocked(fs.readFileSync).mockImplementation(() => {
				throw new Error("File read error");
			});
			vi.mocked(createPrivateKey).getMockImplementation();
			class MockedKey extends AbstractKey {
				protected createKey(): KeyObject {
					this.getContent();
					return createPrivateKey("");
				}
			}

			const key = new MockedKey("");

			// Act & Assert
			expect(() => key.getKey()).toThrow(SignerException);
		});
	});
});
