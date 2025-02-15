import { z } from "zod";

export const getArticleSchema = z.object({
  id: z.string(),
});

export const createArticleSchema = z.object({
  title: z.string().min(8, "Judul artikel minimal 8 karakter"),
  content: z.string().min(100, "Konten artikel minimal 100 karakter"),
  isPublished: z.boolean().default(false),
  thumbnail: z.string().url("Thumbnail harus berupa link"),
    thumbnailKey: z.string(),
});

export const togglePublishArticleSchema = z.object({
    id: z.string(),
    isPublished: z.boolean(),
});

export const deleteArticleSchema = z.object({
    id: z.string(),
});