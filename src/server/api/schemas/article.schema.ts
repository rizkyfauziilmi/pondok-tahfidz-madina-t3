import { z } from "zod";

export const getArticleSchema = z.object({
  id: z.string(),
});

export const getArticlesSchema = z.object({
  search: z.string().default(""),
  orderBy: z
    .enum(["publishedAt", "updatedAt", "title", "views", "likes"])
    .default("publishedAt"),
  orderDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const createArticleSchema = z.object({
  title: z.string().min(8, "Judul artikel minimal 8 karakter"),
  content: z.string().min(100, "Konten artikel minimal 100 karakter"),
  isPublished: z.boolean().default(false),
  thumbnail: z.string().url("Thumbnail harus berupa link"),
  thumbnailKey: z.string().optional(),
});

export const updateArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(8, "Judul artikel minimal 8 karakter").optional(),
  content: z
    .string()
    .min(100, "Konten artikel minimal 100 karakter")
    .optional(),
  isPublished: z.boolean().default(false).optional(),
  thumbnail: z.string().url("Thumbnail harus berupa link").optional(),
  thumbnailKey: z.string().optional(),
});

export const togglePublishArticleSchema = z.object({
  id: z.string(),
  isPublished: z.boolean(),
});

export const togglePublishArticlesSchema = z.object({
  ids: z.array(z.string()),
  isPublished: z.boolean(),
});

export const deleteArticleSchema = z.object({
  id: z.string(),
});

export const deleteArticlesSchema = z.object({
  ids: z.array(z.string()),
});
