import express, { Request, Response } from "express";
import { prisma } from "./utils/prismaClient";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers/appRouter";
import cors from "cors";

const app = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

const PORT = 10000;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.get("/prisma", async (request: Request, response: Response) => {
  const todos = await prisma.todo.findMany();

  response.json(todos);
});

app.listen(PORT, () => {
  console.log(`Hello World!`);
});
