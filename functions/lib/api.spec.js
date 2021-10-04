"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const toQueryString_1 = require("./utils/toQueryString");
const apiUrl = "https://api.cluster-stargatenet.iov.one";
describe("Test api", () => {
    it("Handles empty objects as no parameters", () => {
        const query = (0, toQueryString_1.toQueryString)({});
        expect(query).toBe("");
    });
    it("Encodes query parameters correctly", () => {
        const query = (0, toQueryString_1.toQueryString)({
            [api_1.ROOT]: [{ pagination: { offset: 1 } }, { pagination: { limit: 1 } }],
            events: [
                { message: { module: "starname" } },
                { transfer: { sender: "sender" } },
            ],
        });
        expect(query).toBe("?pagination.offset=1&pagination.limit=1&events=message.module='starname'&events=transfer.sender='sender'");
    });
    it("First test ever", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, api_1.fetchStarnameTransactions)(apiUrl);
        expect(response.length).toBeGreaterThan(0);
    }));
});
