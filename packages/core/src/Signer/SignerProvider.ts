import type { SignerConfigProvider } from "../Config/SignerConfigProvider";
import type { SignerFactoryInterface } from "./SignerFactoryInterface";
import type { SignerInterface } from "./SignerInterface";
import type { SignerProviderInterface } from "./SignerProviderInterface";

export class SignerProvider implements SignerProviderInterface {
	private signers: Record<string, SignerInterface> = {};

	constructor(
		private readonly signerFactory: SignerFactoryInterface,
		private readonly configs: SignerConfigProvider,
	) {}

	get(gateway?: string): SignerInterface {
		const actualGateway = gateway ?? this.configs.getDefaultGateway();

		if (this.signers[actualGateway]) {
			return this.signers[actualGateway];
		}

		const signer = this.signerFactory.create(
			this.configs.getConfig(actualGateway),
		);
		this.signers[actualGateway] = signer;

		return signer;
	}
}
