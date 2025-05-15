// This file is part of the Pixidos package.
// (c) Ondra Votava <ondra@votava.dev>

import { SignerInterface } from './SignerInterface';

export interface SignerProviderInterface {
  get(gateway?: string): SignerInterface;
}
