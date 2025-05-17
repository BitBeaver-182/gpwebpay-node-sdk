import type { SignerConfig } from "../Config/SignerConfig";
import type { SignerInterface } from "./SignerInterface";

export interface SignerFactoryInterface {
	create(config: SignerConfig): SignerInterface;
}
