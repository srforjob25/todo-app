import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "server/src/routers/appRouter";
import type { inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Todo = RouterOutput["todo"]["getTodosOrderByDueDateAsc"][number];
