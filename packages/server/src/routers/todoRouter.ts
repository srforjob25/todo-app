import { z } from "zod";
import { prisma } from "../utils/prismaClient";
import { trpc } from "../utils/trpc";

export const todoRouter = trpc.router({
  getTodosOrderByDueDateAsc: trpc.procedure.query(() => {
    return prisma.todo.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }),
  updateCompletedStatus: trpc.procedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(({ input }) => {
      return prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
    }),
  delete: trpc.procedure.input(z.object({ id: z.number() })).mutation(({ input }) => {
    return prisma.todo.update({
      where: {
        id: input.id,
      },
      data: {
        deleted: true,
      },
    });
  }),
});
