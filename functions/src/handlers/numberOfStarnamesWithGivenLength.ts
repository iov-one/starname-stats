import express from "express";

import { readFromFirestore } from "../api";
import { Entry } from "../types/entry";

export const numberOfStarnamesWithGivenLength = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const cached = await readFromFirestore();
  const length = Number(request.query.length);

  if (isNaN(length)) {
    response.status(400).send("invalid parameters");
  } else {
    response.send(
      cached.filter(
        ({ starname }: Entry): boolean => starname.length === length,
      ),
    );
  }
};
