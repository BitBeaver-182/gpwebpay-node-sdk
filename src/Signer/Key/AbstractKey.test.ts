import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InvalidArgumentException } from '../../Exceptions/InvalidArgumentException';
import { KeyObject } from 'crypto';
import * as fs from 'fs';
import { AbstractKey } from './AbstractKey';

// Mock fs module
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn()
}));

// Mock crypto module
vi.mock('crypto', () => ({
  KeyObject: class { }, // Mock KeyObject class
  createPrivateKey: vi.fn(),
  createPublicKey: vi.fn()
}));

// Create a concrete implementation of AbstractKey for testing
class ConcreteKey extends AbstractKey {
  protected createKey(): KeyObject {
    // For testing purposes, return a mock KeyObject
    const mockKeyObject = {} as KeyObject;
    return mockKeyObject;
  }
}

describe('AbstractKey', () => {
  const testFilePath = '/path/to/key.pem';

  beforeEach(() => {
    // Default behavior for mocks
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue('mock-key-content');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance with a valid file path', () => {
      // Arrange & Act
      const key = new ConcreteKey(testFilePath);

      // Assert
      expect(key).toBeInstanceOf(AbstractKey);
      expect(fs.existsSync).toHaveBeenCalledWith(testFilePath);
    });

    it('should throw InvalidArgumentException if file does not exist', () => {
      // Arrange
      vi.mocked(fs.existsSync).mockReturnValue(false);

      // Act & Assert
      expect(() => new ConcreteKey(testFilePath)).toThrow(InvalidArgumentException);
      expect(() => new ConcreteKey(testFilePath)).toThrow(`Key file (${testFilePath}) does not exist or is not readable!`);
      expect(fs.existsSync).toHaveBeenCalledWith(testFilePath);
    });
  });

  describe('getKey', () => {
    it('should return a key object', () => {
      // Arrange
      const key = new ConcreteKey(testFilePath);

      // Act
      const result = key.getKey();

      // Assert
      expect(result).toBeDefined();
    });

    it('should cache the key object on subsequent calls', () => {
      // Arrange
      const key = new ConcreteKey(testFilePath);
      const spy = vi.spyOn(key as any, 'createKey');

      // Act
      const firstResult = key.getKey();
      const secondResult = key.getKey();

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(firstResult).toBe(secondResult);
    });
  });

  describe('getContent', () => {
    it('should return file content when file can be read', () => {
      // Arrange
      const mockContent = 'test-key-content';
      vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
      const key = new ConcreteKey(testFilePath);

      // Act
      const content = (key as any).getContent();

      // Assert
      expect(content).toBe(mockContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(testFilePath, 'utf-8');
    });

    it('should throw SignerException when file cannot be read', () => {
      // Arrange
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('File read error');
      });
      const key = new ConcreteKey(testFilePath);

      // Act & Assert
      expect(() => (key as any).getContent())
        .toThrow(`Failed to open file with key "${testFilePath}"`);
      expect(fs.readFileSync).toHaveBeenCalledWith(testFilePath, 'utf-8');
    });
  });

  describe('createKey', () => {
    it('should be implemented by derived classes', () => {
      // Arrange
      const key = new ConcreteKey(testFilePath);

      // Act
      const keyObject = (key as any).createKey();

      // Assert
      expect(keyObject).toBeDefined();
    });
  });
});
