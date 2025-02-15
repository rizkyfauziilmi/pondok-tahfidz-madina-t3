import {
  createArticleSchema, deleteArticleSchema,
  getArticleSchema, togglePublishArticleSchema,
} from "../schemas/article.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import {TRPCError} from "@trpc/server";
import {UTApi} from "uploadthing/server";

const utapi = new UTApi();

export const articleRouter = createTRPCRouter({
  getDashboardArticles: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.article.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        author: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });
  }),
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
          publishedAt: input.isPublished ? new Date() : null,
          authorId: ctx.session.user.id,
        },
      });
    }),
  togglePublishArticle: adminProcedure
    .input(togglePublishArticleSchema)
    .mutation(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!article) {
        throw new TRPCError({
          code: "NOT_FOUND",
            message: "Artikel tidak ditemukan",
        })
      }

      return ctx.db.article.update({
        where: {
          id: input.id,
        },
        data: {
          isPublished: input.isPublished,
          publishedAt: input.isPublished ? new Date() : null,
        },
      });
    }),
  deleteArticle: adminProcedure
    .input(deleteArticleSchema)
    .mutation(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUnique({
          where: {
              id: input.id,
          },
      });

      if (!article) {
          throw new TRPCError({
              code: "NOT_FOUND",
              message: "Artikel tidak ditemukan",
          })
      }

      await utapi.deleteFiles([article.thumbnailKey]);

      return ctx.db.article.delete({
          where: {
              id: input.id,
          },
      });
    }),
});
