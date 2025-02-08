import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthConfig = {
  providers: [Google],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
    signOut: "/", // Redirect to home page after sign out
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token }) => {
      const userFromDB = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (userFromDB) {
        token.id = userFromDB.id;
        token.isAdmin = userFromDB.isAdmin;
      }

      return token;
    },
    session: ({ token, session }) => {
      session.user.id = token.id as string;
      session.user.isAdmin = token.isAdmin as boolean;

      return session;
    },
  },
};
