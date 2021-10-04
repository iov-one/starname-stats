import flatten from "flat";

const stringify = (value: unknown): string => {
  if (typeof value === "string") {
    return `'${value}'`;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "object") {
    const entries = Object.entries(flatten(value));

    if (entries.length !== 1) {
      throw new Error("cannot flatten object correctly");
    }

    const pair = entries[0];

    return `${pair[0]}=${stringify(pair[1])}`;
  } else {
    throw new Error(`cannot encode this value: ${typeof value}`);
  }
};

const reduceToKeyValuePairs = (
  result: ReadonlyArray<[string, string]>,
  [key, value]: [string, unknown],
): ReadonlyArray<[string, string]> => {
  if (value instanceof Array) {
    return [
      ...result,
      ...value.map((each: unknown): [string, string] => [key, stringify(each)]),
    ];
  }

  return [...result, [key, stringify(value)]];
};

const reduceToEqualityExpressions = (
  items: ReadonlyArray<string>,
  [key, value]: [string, string],
): ReadonlyArray<string> => {
  if (key === "") {
    return [...items, value];
  }
  return [...items, `${key}=${value}`];
};

export const toQueryString = (params: Record<string, unknown>): string => {
  const entries = Object.entries(params);
  const result = entries
    .reduce(reduceToKeyValuePairs, [])
    .reduce(reduceToEqualityExpressions, [])
    .join("&");

  if (result === "") {
    return "";
  } else {
    return `?${result}`;
  }
};
