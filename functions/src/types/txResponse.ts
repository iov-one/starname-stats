import { Logs } from "./logs";
import { Tx } from "./tx";

export interface TxResponse {
  readonly height: string;
  readonly txhash: string;
  readonly codespace: string;
  readonly code: number;
  readonly data: string;
  readonly raw_logs: string;
  readonly logs: Logs;
  readonly info: string;
  readonly gas_wanted: string;
  readonly gas_used: string;
  readonly tx: Tx;
  readonly timestamp: number;
}
