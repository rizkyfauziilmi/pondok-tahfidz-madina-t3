import { TRPCError } from "@trpc/server";
import {
  becomeAdminSchema,
  setAdminPasswordSchema,
  updateAdminPasswordSchema,
} from "../schemas/admin-password.schema";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import argon2 from "argon2";

export const adminPasswordRouter = createTRPCRouter({
  getCurrent: publicProcedure.query(async ({ ctx }) => {
    const password = await ctx.db.adminPassword.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return password ?? null;
  }),
  setPassword: protectedProcedure
    .input(setAdminPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      // Delete all previous passwords
      await ctx.db.adminPassword.deleteMany({});

      let hashedPassword;

      try {
        hashedPassword = await argon2.hash(input.password);
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal menghash password",
        });
      }

      return ctx.db.adminPassword.create({
        data: {
          hashedPassword,
        },
      });
    }),
  becomeAdmin: protectedProcedure
    .input(becomeAdminSchema)
    .mutation(async ({ ctx, input }) => {
      const password = await ctx.db.adminPassword.findFirst({
        orderBy: { createdAt: "desc" },
      });

      if (!password) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Password admin belum diatur",
        });
      }

      const isValid = await argon2.verify(
        password.hashedPassword,
        input.password,
      );

      if (!isValid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Password salah",
        });
      }

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          isAdmin: true,
        },
      });
    }),
  becomeUser: adminProcedure.mutation(async ({ ctx }) => {
    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        isAdmin: false,
      },
    });
  }),
  updateAdminPassword: adminProcedure
    .input(updateAdminPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const passwordLama = await ctx.db.adminPassword.findFirst({
        orderBy: { createdAt: "desc" },
      });

      if (!passwordLama) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Password admin belum diatur",
        });
      }

      const isValid = await argon2.verify(
        passwordLama.hashedPassword,
        input.oldPassword,
      );

      if (!isValid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Password lama salah",
        });
      }

      // check if new password is the same as the old password, throw error if true
      if (input.oldPassword === input.newPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password baru tidak boleh sama dengan password lama",
        });
      }

      let hashedPassword;

      try {
        hashedPassword = await argon2.hash(input.newPassword);
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal menghash password",
        });
      }

      return ctx.db.adminPassword.update({
        where: {
          id: passwordLama.id,
        },
        data: {
          hashedPassword,
        },
      });
    }),
});
