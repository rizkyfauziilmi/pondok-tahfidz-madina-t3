import { z } from "zod";

export const deleteFilesSchema = z.object({
  ids: z.union([z.string().min(1, "ID wajib diisi"), z.array(z.string())]),
});
