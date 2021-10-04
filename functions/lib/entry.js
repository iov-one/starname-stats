"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
class Entry {
    static fromTxResponse(txResponse) {
        const { body } = txResponse.tx;
        const { messages } = body;
        return messages
            .map((message) => {
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
            .filter((entry) => entry !== undefined);
    }
}
exports.Entry = Entry;
