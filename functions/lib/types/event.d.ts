import { Attr } from "./attr";
export interface Event {
    readonly type: string;
    readonly attributes: ReadonlyArray<Attr>;
}
