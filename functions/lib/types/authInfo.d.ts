import { Fee } from "./fee";
import { SignerInfo } from "./signerInfo";
export interface AuthInfo {
    readonly signer_infos: ReadonlyArray<SignerInfo>;
    readonly fees: ReadonlyArray<Fee>;
    readonly signatures: ReadonlyArray<string>;
}
