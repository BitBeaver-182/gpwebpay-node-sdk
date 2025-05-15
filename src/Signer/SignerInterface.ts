import { Stringable } from "../Param/IParam";

export interface SignerInterface {
  /**
   * @param params - An object with string keys and string or Stringable values
   */
  sign(params: Record<string, string | Stringable>): string;

  /**
   * @param params - An object with string keys and string or Stringable values
   * @param digest - The digest to verify against
   */
  verify(params: Record<string, string | Stringable>, digest: string): boolean;
}