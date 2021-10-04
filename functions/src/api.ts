import axios from "axios";

import { Entry } from "./types/entry";
import { QueryResponse } from "./types/queryResponse";
import { toQueryString } from "./utils/toQueryString";
import admin = require("firebase-admin");

// Initialize firebase application
admin.initializeApp({
  projectId: "starname-stats",
});

export const ROOT = "";
const database = admin.firestore();

export const writeToFirestore = async (
  entries: ReadonlyArray<Entry>,
): Promise<void> => {
  const collection = database.collection("starnames");
  const document = collection.doc("stats");
  // Overwrite
  await document.set({ entries });
};

export const readFromFirestore = async (): Promise<ReadonlyArray<Entry>> => {
  const collection = database.collection("starnames");
  const document = collection.doc("stats");
  const snapshot = await document.get();
  const data = snapshot.data() as
    | { readonly entries: ReadonlyArray<Entry> }
    | undefined;

  return data ? data.entries : [];
};

export const fetchStarnameTransactions = async (
  apiUrl: string,
): Promise<ReadonlyArray<Entry>> => {
  const cached = await readFromFirestore();

  const params = {
    [ROOT]: [
      { pagination: { offset: cached.length } },
      { pagination: { limit: 100 } },
    ],
    events: [{ message: { module: "starname" } }],
  };

  const url = `${apiUrl}/cosmos/tx/v1beta1/txs${toQueryString(params)}`;
  console.info(url);

  const rawResponse = await axios.get(url);

  if (rawResponse.status === 200) {
    const { tx_responses } = rawResponse.data;

    const transformed = tx_responses
      .map(
        (item: any): QueryResponse => ({
          ...item,
          timestamp: Date.parse(item.timestamp),
        }),
      )
      .map(Entry.fromTxResponse)
      .reduce(
        (
          flat: ReadonlyArray<Entry>,
          array: ReadonlyArray<Entry>,
        ): ReadonlyArray<Entry> => [...flat, ...array],
        [],
      );

    const everything = [...cached, ...transformed];
    // Update the cache
    await writeToFirestore(everything);

    return everything;
  }

  return cached;
};
