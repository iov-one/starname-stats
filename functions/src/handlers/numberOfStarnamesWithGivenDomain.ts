import express from "express";

import { readFromFirestore } from "../api";
import { Entry } from "../types/entry";

export const numberOfStarnamesWithGivenDomain = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const cached = await readFromFirestore();
  const domain = request.query.domain;

  if (!domain) {
    response.status(400).send("invalid parameters");
  } else {
    response.send(
      cached.filter(({ starname }: Entry): boolean =>
        starname.endsWith(`*${domain}`),
      ),
    );
  }
};
