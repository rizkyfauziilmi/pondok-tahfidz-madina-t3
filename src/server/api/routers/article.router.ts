import {
  createArticleSchema,
  deleteArticleSchema,
  deleteArticlesSchema,
  getArticleSchema,
  getArticlesSchema,
  togglePublishArticleSchema,
  togglePublishArticlesSchema,
} from "../schemas/article.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { UTApi } from "uploadthing/server";

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
  getArticles: publicProcedure
    .input(getArticlesSchema)
    .query(async ({ ctx, input }) => {
      const { search, orderBy, orderDirection } = input;
      // default = { search: '', orderBy: 'publishedAt', orderDirection: 'desc' }
      const isDefaultSearch =
        search === "" && orderBy === "publishedAt" && orderDirection === "desc";

      const articles = await ctx.db.article.findMany({
        where: {
          isPublished: true,
          title: {
            contains: search,
          },
        },
        orderBy: {
          publishedAt: orderBy === "publishedAt" ? orderDirection : undefined,
          updatedAt: orderBy === "updatedAt" ? orderDirection : undefined,
          title: orderBy === "title" ? orderDirection : undefined,
          views: orderBy === "views" ? orderDirection : undefined,
          likes: orderBy === "likes" ? orderDirection : undefined,
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

      const isNotFound = isDefaultSearch && articles.length === 0;

      if (isNotFound) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Artikel tidak ditemukan, tunggu hingga artikel dipublikasikan",
        });
      }

      return articles;
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
  createArticle: adminProcedure
    .input(createArticleSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
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
        });
      }

      const publishedAt = input.isPublished ? new Date() : null;
      return ctx.db.article.update({
        where: {
          id: input.id,
        },
        data: {
          isPublished: input.isPublished,
          publishedAt,
        },
      });
    }),
  togglePublishArticles: adminProcedure
    .input(togglePublishArticlesSchema)
    .mutation(async ({ ctx, input }) => {
      const { ids, isPublished } = input;

      const articles = await ctx.db.article.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      if (articles.length !== ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artikel tidak ditemukan",
        });
      }

      const publishedAt = isPublished ? new Date() : null;
      return ctx.db.article.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          isPublished,
          publishedAt,
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
        });
      }

      if (article.thumbnailKey) {
        await utapi.deleteFiles([article.thumbnailKey]);
      }

      return ctx.db.article.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteArticles: adminProcedure
    .input(deleteArticlesSchema)
    .mutation(async ({ ctx, input }) => {
      const articles = await ctx.db.article.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (articles.length !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artikel tidak ditemukan",
        });
      }

      const thumbnailKeys = articles
        .filter((article) => article.thumbnailKey)
        .map((article) => article.thumbnailKey)
        .filter((key): key is string => key !== null);

      if (thumbnailKeys.length) {
        await utapi.deleteFiles(thumbnailKeys);
      }

      return ctx.db.article.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  incrementView: publicProcedure
    .input(getArticleSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.article.update({
        where: {
          id: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }),
});
