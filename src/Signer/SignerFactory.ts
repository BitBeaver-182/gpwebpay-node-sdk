import { SignerConfig } from "../Config/SignerConfig";
import { PrivateKey } from "./Key/PrivateKey";
import { PublicKey } from "./Key/PublicKey";
import { Signer } from "./Signer";
import { SignerFactoryInterface } from "./SignerFactoryInterface";
import { SignerInterface } from "./SignerInterface";

export class SignerFactory implements SignerFactoryInterface {
  create(config: SignerConfig): SignerInterface {
    return new Signer(
      new PrivateKey(config.getPrivateKey(), config.getPrivateKeyPassword()),
      new PublicKey(config.getPublicKey())
    );
  }
}