import { PublicKey } from "./publicKey";
import { SignModeInfo } from "./signModeInfo";

export interface SignerInfo {
  readonly public_key: PublicKey;
  readonly mode_info: SignModeInfo;
}
