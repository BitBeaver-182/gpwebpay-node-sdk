import { SignerConfig } from "../Config/SignerConfig";
import { SignerInterface } from "./SignerInterface";


export interface SignerFactoryInterface {
  create(config: SignerConfig): SignerInterface;
}