"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryString = void 0;
const flat_1 = __importDefault(require("flat"));
const stringify = (value) => {
    if (typeof value === "string") {
        return `'${value}'`;
    }
    else if (typeof value === "number") {
        return value.toString();
    }
    else if (typeof value === "object") {
        const entries = Object.entries((0, flat_1.default)(value));
        if (entries.length !== 1) {
            throw new Error("cannot flatten object correctly");
        }
        const pair = entries[0];
        return `${pair[0]}=${stringify(pair[1])}`;
    }
    else {
        throw new Error(`cannot encode this value: ${typeof value}`);
    }
};
const reduceToKeyValuePairs = (result, [key, value]) => {
    if (value instanceof Array) {
        return [
            ...result,
            ...value.map((each) => [key, stringify(each)]),
        ];
    }
    return [...result, [key, stringify(value)]];
};
const reduceToEqualityExpressions = (items, [key, value]) => {
    if (key === "") {
        return [...items, value];
    }
    return [...items, `${key}=${value}`];
};
const toQueryString = (params) => {
    const entries = Object.entries(params);
    const result = entries
        .reduce(reduceToKeyValuePairs, [])
        .reduce(reduceToEqualityExpressions, [])
        .join("&");
    if (result === "") {
        return "";
    }
    else {
        return `?${result}`;
    }
};
exports.toQueryString = toQueryString;
