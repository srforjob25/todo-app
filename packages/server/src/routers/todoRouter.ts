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
  getTodoById: trpc.procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input }) => {
      const id = input.id;
      return prisma.todo.findUnique({
        where: {
          id: id,
        },
      });
    }),
  create: trpc.procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        dueDate: z.date(),
      }),
    )
    .mutation(({ input }) => {
      const title = input.title;
      const description = input.description;
      const dueDate = input.dueDate;

      return prisma.todo.create({
        data: {
          title: title,
          description: description,
          dueDate: dueDate,
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
  update: trpc.procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        dueDate: z.date(),
      }),
    )
    .mutation(({ input }) => {
      const title = input.title;
      const description = input.description;
      const dueDate = input.dueDate;

      return prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: title,
          description: description,
          dueDate: dueDate,
        },
      });
    }),
  updateCompletedStatus: trpc.procedure
    .input(
      z.object({
        id: z.number(),
        completed: z.boolean(),
      }),
    )
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
});
