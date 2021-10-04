export declare enum SignMode {
    Direct = "SIGN_MODE_DIRECT",
    Legacy = "SIGN_MODE_LEGACY_AMINO_JSON"
}
export interface SingleSignModeInfo {
    readonly mode: SignMode;
}
