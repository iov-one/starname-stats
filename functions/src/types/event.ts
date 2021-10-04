import { Attr } from "./attr";

export interface Event {
  readonly type: string; // Could be Type enum?
  readonly attributes: ReadonlyArray<Attr>;
}
