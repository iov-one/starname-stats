import { TxResponse } from "./types/txResponse";
export declare const ROOT = "";
export declare const fetchStarnameTransactions: (apiUrl: string, offset: number, limit: number) => Promise<ReadonlyArray<TxResponse>>;
