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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const byDateRange_1 = require("./handlers/byDateRange");
const getAll_1 = require("./handlers/getAll");
const histogram_1 = require("./handlers/histogram");
const numberOfAccountsWithTokens_1 = require("./handlers/numberOfAccountsWithTokens");
const numberOfStarnamesWithGivenDomain_1 = require("./handlers/numberOfStarnamesWithGivenDomain");
const numberOfStarnamesWithGivenLength_1 = require("./handlers/numberOfStarnamesWithGivenLength");
const functions = require("firebase-functions");
const application = (0, express_1.default)();
application.use((0, cors_1.default)());
application.get("/by-date-range", byDateRange_1.byDateRange);
application.get("/number-of-star1-addresses", numberOfAccountsWithTokens_1.numberOfAccountsWithTokens);
application.get("/number-of-starnames-with-domain", numberOfStarnamesWithGivenDomain_1.numberOfStarnamesWithGivenDomain);
application.get("/number-of-starnames-of-length", numberOfStarnamesWithGivenLength_1.numberOfStarnamesWithGivenLength);
application.get("/get-all", getAll_1.getAll);
application.get("/histogram", histogram_1.histogram);
const collect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, api_1.fetchStarnameTransactions)("https://api.cluster-stargatenet.iov.one");
    return null;
});
exports.scheduled = functions.pubsub.schedule("every 6 hours").onRun(collect);
exports.api = functions.https.onRequest(application);
