import { SignerConfig } from './SignerConfig'; // Assuming this class exists
import { InvalidArgumentException } from '../Exceptions/InvalidArgumentException'; // Adjust path as needed

export class SignerConfigProvider {
  /**
   * @var Record<string, SignerConfig>
   */
  private configs: Record<string, SignerConfig> = {};

  private defaultGateway: string = 'default';

  addConfig(config: SignerConfig, gateway: string = 'default'): void {
    this.configs[gateway] = config;
  }

  getConfig(gateway: string | null = null): SignerConfig {
    if (gateway === null) {
      gateway = this.defaultGateway;
    }
    if (this.configs.hasOwnProperty(gateway)) {
      return this.configs[gateway];
    }

    throw new InvalidArgumentException(
      `Config for gateway "${gateway}" does not exist. You are probably forgot added or you wrong set default config.`
    );
  }

  setDefaultGateway(gateway: string): void {
    this.defaultGateway = gateway;
  }

  getDefaultGateway(): string {
    return this.defaultGateway;
  }
}