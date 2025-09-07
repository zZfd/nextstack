import { appRouter, createContext } from "@lzt/api-router";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

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