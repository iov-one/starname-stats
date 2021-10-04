import { AuthInfo } from "./authInfo";
import { Message } from "./message";
export interface TxBody {
    readonly messages: ReadonlyArray<Message>;
    readonly memo: string;
    readonly authInfo: AuthInfo;
}
