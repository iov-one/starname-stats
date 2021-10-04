import { SingleSignModeInfo } from "./singleSignModeInfo";

export interface SignModeInfo {
  readonly single: SingleSignModeInfo;
  // FIXME: I guess this would be something like "multi"
}
