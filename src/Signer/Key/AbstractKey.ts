import type { KeyObject } from "node:crypto";
import * as fs from "node:fs";
import { InvalidArgumentException } from "../../Exceptions/InvalidArgumentException";
import { SignerException } from "../../Exceptions/SignerException";

export abstract class AbstractKey {
	protected key: KeyObject | null = null;

	constructor(protected readonly file: string) {
		this.verifyFile(file);
	}

	public getKey(): KeyObject {
		console.log("this.key ", this.key)
		if (this.key !== null) {
			console.log("here")
			return this.key;
		}
		console.log("there")
		this.key = this.createKey();
		return this.key;
	}

	protected verifyFile(file: string): void {
		if (!fs.existsSync(file)) {
			throw new InvalidArgumentException(
				`Key file (${file}) does not exist or is not readable!`,
			);
		}
	}

	protected getContent(): string {
		try {
			return fs.readFileSync(this.file, "utf-8");
		} catch (err) {
			throw new SignerException(`Failed to open file with key "${this.file}"`);
		}
	}

	protected abstract createKey(): KeyObject;
}
