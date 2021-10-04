import { Moment } from "moment";
import { TxResponse } from "./types/txResponse";
export interface Entry {
    readonly starname: string;
    readonly date: Moment;
}
export declare class Entry {
    static fromTxResponse(response: TxResponse): Entry;
}
