import express from "express";

import { readFromFirestore } from "../api";

export const getAll = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const cached = await readFromFirestore();

  response.send(cached);
};
