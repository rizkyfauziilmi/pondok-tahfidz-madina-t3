import { adminProcedure, createTRPCRouter } from "../trpc";
import { deleteFilesSchema } from "../schemas/utapi.schema";
import { TRPCError } from "@trpc/server";

import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export const utapiRouter = createTRPCRouter({
  deleteFiles: adminProcedure
    .input(deleteFilesSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await utapi.deleteFiles(input.ids);

        if (!response.success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete files",
          });
        }

        return response;
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete files",
        });
      }
    }),
});
