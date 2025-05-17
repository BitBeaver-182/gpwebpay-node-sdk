import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException"; // Adjust path as needed
import type { SignerConfig } from "./SignerConfig"; // Assuming this class exists

export class SignerConfigProvider {
	/**
	 * @var Record<string, SignerConfig>
	 */
	private configs: Record<string, SignerConfig> = {};

	private defaultGateway = "default";

	addConfig(config: SignerConfig, gateway = "default"): void {
		this.configs[gateway] = config;
	}

	getConfig(gateway: string | null = null): SignerConfig {
		const resolvedGateway = gateway ?? this.defaultGateway;

		if (Object.prototype.hasOwnProperty.call(this.configs, resolvedGateway)) {
			return this.configs[resolvedGateway];
		}

		throw new InvalidArgumentException(
			`Config for gateway "${resolvedGateway}" does not exist. You probably forgot to add it or set the default config incorrectly.`,
		);
	}

	setDefaultGateway(gateway: string): void {
		this.defaultGateway = gateway;
	}

	getDefaultGateway(): string {
		return this.defaultGateway;
	}
}
