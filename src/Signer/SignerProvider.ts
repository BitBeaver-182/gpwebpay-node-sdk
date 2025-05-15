import { SignerInterface } from './SignerInterface';
import { SignerProviderInterface } from './SignerProviderInterface';
import { SignerFactoryInterface } from './SignerFactoryInterface';
import { SignerConfigProvider } from '../Config/SignerConfigProvider';

export class SignerProvider implements SignerProviderInterface {
  private signers: Record<string, SignerInterface> = {};

  constructor(
    private readonly signerFactory: SignerFactoryInterface,
    private readonly configs: SignerConfigProvider
  ) { }

  get(gateway?: string): SignerInterface {
    if (!gateway) {
      gateway = this.configs.getDefaultGateway();
    }

    if (this.signers[gateway]) {
      return this.signers[gateway];
    }

    const signer = this.signerFactory.create(this.configs.getConfig(gateway));
    this.signers[gateway] = signer;

    return signer;
  }
}
