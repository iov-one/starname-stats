import { TxResponse } from "./txResponse";

interface Resource {
  readonly uri: string;
  readonly resource: string;
}

export interface Entry {
  readonly starname: string;
  readonly date: number;
  readonly owner: string;
  readonly broker: string;
  readonly resources?: ReadonlyArray<Resource>;
}

export class Entry {
  static fromTxResponse(txResponse: TxResponse): ReadonlyArray<Entry> {
    const { body } = txResponse.tx;
    const { messages } = body;
    return messages
      .map((message: any): Entry | undefined => {
        switch (message["@type"]) {
          case "/starnamed.x.starname.v1beta1.MsgRegisterAccount":
            return {
              starname: [message.name, message.domain].join("*"),
              owner: message.owner,
              broker: message.broker,
              resources: message.resources,
              date: txResponse.timestamp,
            };
          case "/starnamed.x.starname.v1beta1.MsgRegisterDomain":
            return {
              starname: ["", message.name].join("*"),
              owner: message.admin,
              broker: message.broker,
              date: txResponse.timestamp,
            };
          default:
            return undefined;
        }
      })
      .filter(
        (entry: Entry | undefined): boolean => entry !== undefined,
      ) as ReadonlyArray<Entry>;
  }
}
