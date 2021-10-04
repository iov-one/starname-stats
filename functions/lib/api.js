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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStarnameTransactions = exports.readFromFirestore = exports.writeToFirestore = exports.ROOT = void 0;
const axios_1 = __importDefault(require("axios"));
const entry_1 = require("./types/entry");
const toQueryString_1 = require("./utils/toQueryString");
const admin = require("firebase-admin");
// Initialize firebase application
admin.initializeApp({
    projectId: "starname-stats",
});
exports.ROOT = "";
const database = admin.firestore();
const writeToFirestore = (entries) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = database.collection("starnames");
    const document = collection.doc("stats");
    // Overwrite
    yield document.set({ entries });
});
exports.writeToFirestore = writeToFirestore;
const readFromFirestore = () => __awaiter(void 0, void 0, void 0, function* () {
    const collection = database.collection("starnames");
    const document = collection.doc("stats");
    const snapshot = yield document.get();
    const data = snapshot.data();
    return data ? data.entries : [];
});
exports.readFromFirestore = readFromFirestore;
const fetchStarnameTransactions = (apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const cached = yield (0, exports.readFromFirestore)();
    const params = {
        [exports.ROOT]: [
            { pagination: { offset: cached.length } },
            { pagination: { limit: 100 } },
        ],
        events: [{ message: { module: "starname" } }],
    };
    const url = `${apiUrl}/cosmos/tx/v1beta1/txs${(0, toQueryString_1.toQueryString)(params)}`;
    console.info(url);
    const rawResponse = yield axios_1.default.get(url);
    if (rawResponse.status === 200) {
        const { tx_responses } = rawResponse.data;
        const transformed = tx_responses
            .map((item) => (Object.assign(Object.assign({}, item), { timestamp: Date.parse(item.timestamp) })))
            .map(entry_1.Entry.fromTxResponse)
            .reduce((flat, array) => [...flat, ...array], []);
        const everything = [...cached, ...transformed];
        // Update the cache
        yield (0, exports.writeToFirestore)(everything);
        return everything;
    }
    return cached;
});
exports.fetchStarnameTransactions = fetchStarnameTransactions;
