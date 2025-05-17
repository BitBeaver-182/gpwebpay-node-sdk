import { type KeyObject, createPublicKey } from "node:crypto";
import { SignerException } from "../../Exceptions/SignerException";
import { AbstractKey } from "./AbstractKey";

export class PublicKey extends AbstractKey {
	protected createKey(): KeyObject {
		try {
			console.log("createKey");
			const content = this.getContent();
			console.log("content", content);
			return createPublicKey({
				key: content,
				format: "pem",
				type: "spki", // Usually 'spki' for public keys; change if your key is in another format
			});
		} catch (error) {
			console.log("it errors");
			throw new SignerException(`"${this.file}" is not a valid public key.`);
		}
	}
}
