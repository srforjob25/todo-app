import { prisma } from "../utils/prismaClient";
import { trpc } from "../utils/trpc";

export const todoRouter = trpc.router({
  getTodos: trpc.procedure.query(() => {
    return prisma.todo.findMany({
      where: {
        deleted: false,
      },
    });
  }),
});
