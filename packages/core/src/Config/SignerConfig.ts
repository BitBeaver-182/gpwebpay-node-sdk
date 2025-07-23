/**
 * This class holds configuration for signing operations,
 * including private and public key paths and the private key password.
 */
export class SignerConfig {
	constructor(
		private readonly privateKey: string,
		private readonly privateKeyPassword: string,
		private readonly publicKey: string,
	) {}

	getPrivateKey(): string {
		return this.privateKey;
	}

	getPrivateKeyPassword(): string {
		return this.privateKeyPassword;
	}

	getPublicKey(): string {
		return this.publicKey;
	}
}
