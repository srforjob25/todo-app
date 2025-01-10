import express, { Request, Response } from "express";
import { prisma } from "./lib/prismaClient";

const app = express();

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
