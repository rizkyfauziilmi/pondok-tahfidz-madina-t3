import {
  createArticleSchema,
  getArticleSchema,
} from "../schemas/article.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  getArticles: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.article.findMany({
      where: {
        isPublished: true,
      },
    });
  }),
  getArticle: publicProcedure
    .input(getArticleSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.article.findFirst({
        where: {
          AND: [
            {
              id: input.id,
            },
            {
              isPublished: true,
            },
          ],
        },
      });
    }),
  createArticle: adminProcedure
    .input(createArticleSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.article.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      });
    }),
});
