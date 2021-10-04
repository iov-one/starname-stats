import { Amount } from "./amount";
export interface Fee {
    readonly amount: ReadonlyArray<Amount>;
}
