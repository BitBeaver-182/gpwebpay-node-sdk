import { createSign, createVerify } from "crypto";
import { SignerException } from "../Exceptions/SignerException";
import { PrivateKey } from "./Key/PrivateKey";
import { PublicKey } from "./Key/PublicKey";
import { SignerInterface } from "./SignerInterface";
import { Stringable } from "../Param/IParam";


export class Signer implements SignerInterface {
  constructor(
    private readonly privateKey: PrivateKey,
    private readonly publicKey: PublicKey,
    private readonly algorithm: string = 'RSA-SHA1' // Equivalent to OPENSSL_ALGO_SHA1
  ) { }

  public sign(params: Record<string, string | Stringable>): string {
    const digestText = Object.values(params)
      .map(value => value.toString())
      .join('|');

    try {
      const signer = createSign(this.algorithm);
      signer.update(digestText);
      signer.end();
      const signature = signer.sign(this.privateKey.getKey());
      return signature.toString('base64');
    } catch (err) {
      throw new SignerException('Unable to sign data');
    }
  }

  public verify(params: Record<string, string | Stringable>, digest: string): boolean {
    const data = Object.values(params)
      .map(value => value.toString())
      .join('|');

    const decoded = Buffer.from(digest, 'base64');

    try {
      const verifier = createVerify(this.algorithm);
      verifier.update(data);
      verifier.end();
      return verifier.verify(this.publicKey.getKey(), decoded);
    } catch {
      return false;
    }
  }

}
