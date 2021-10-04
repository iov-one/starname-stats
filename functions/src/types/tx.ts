import { TxBody } from "./txBody";

export interface Tx {
  readonly "@type": string;
  readonly body: TxBody;
}
