import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@lzt/api-router";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Allow Vite dev server

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("api-server listening on http://localhost:4000");
});