import { trpc } from "../utils/trpc";
import { todoRouter } from "./todoRouter";

export const appRouter = trpc.router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
