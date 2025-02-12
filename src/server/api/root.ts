import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { adminPasswordRouter } from "./routers/admin-password.router";
import { articleRouter } from "./routers/article.router";
import { utapiRouter } from "./routers/utapi.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  adminPasswordRouter,
  articleRouter,
  utapiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
