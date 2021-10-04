import { TxResponse } from "./txResponse";
export interface QueryResponse {
    readonly tx_responses: ReadonlyArray<TxResponse>;
    readonly pagination: {
        readonly next_key: string | null;
        readonly total: number;
    };
}
