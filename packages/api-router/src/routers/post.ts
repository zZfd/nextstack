import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({ data: input });
    }),
});