import { Event } from "./event";

export interface Logs {
  readonly msg_index: number;
  readonly log: string;
  readonly events: ReadonlyArray<Event>;
}
