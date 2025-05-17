// This file is part of the Pixidos package.
// (c) Ondra Votava <ondra@votava.dev>

import type { SignerInterface } from "./SignerInterface";

export interface SignerProviderInterface {
	get(gateway?: string): SignerInterface;
}
