import cors from "cors";
import express from "express";

import { fetchStarnameTransactions } from "./api";
import { byDateRange } from "./handlers/byDateRange";
import { getAll } from "./handlers/getAll";
import { histogram } from "./handlers/histogram";
import { numberOfAccountsWithTokens } from "./handlers/numberOfAccountsWithTokens";
import { numberOfStarnamesWithGivenDomain } from "./handlers/numberOfStarnamesWithGivenDomain";
import { numberOfStarnamesWithGivenLength } from "./handlers/numberOfStarnamesWithGivenLength";

import functions = require("firebase-functions");

const application = express();

application.use(cors());
application.get("/by-date-range", byDateRange);
application.get("/number-of-star1-addresses", numberOfAccountsWithTokens);
application.get(
  "/number-of-starnames-with-domain",
  numberOfStarnamesWithGivenDomain,
);
application.get(
  "/number-of-starnames-of-length",
  numberOfStarnamesWithGivenLength,
);
application.get("/get-all", getAll);
application.get("/histogram", histogram);

const collect = async (): Promise<void | null> => {
  await fetchStarnameTransactions("https://api.cluster-stargatenet.iov.one");
  return null;
};

exports.scheduled = functions.pubsub.schedule("every 6 hours").onRun(collect);
exports.api = functions.https.onRequest(application);
