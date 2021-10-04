import express from "express";

export const numberOfTransactions = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  response.status(501).send("not implemented");
};
