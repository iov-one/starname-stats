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
exports.byDateRange = void 0;
const api_1 = require("../api");
const byDateRange = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const cached = yield (0, api_1.readFromFirestore)();
    const fromTimestamp = Number(request.query.from);
    const toTimestamp = Number(request.query.to);
    if (isNaN(fromTimestamp) || isNaN(toTimestamp)) {
        response.status(400).send("invalid parameters");
    }
    else {
        response.send(cached.filter((entry) => entry.date >= fromTimestamp && entry.date <= toTimestamp));
    }
});
exports.byDateRange = byDateRange;