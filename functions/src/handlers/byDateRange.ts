import express from "express";

import { readFromFirestore } from "../api";
import { Entry } from "../types/entry";

export const byDateRange = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const cached = await readFromFirestore();
  const fromTimestamp = Number(request.query.from);
  const toTimestamp = Number(request.query.to);

  if (isNaN(fromTimestamp) || isNaN(toTimestamp)) {
    response.status(400).send("invalid parameters");
  } else {
    response.send(
      cached.filter(
        (entry: Entry): boolean =>
          entry.date >= fromTimestamp && entry.date <= toTimestamp,
      ),
    );
  }
};
