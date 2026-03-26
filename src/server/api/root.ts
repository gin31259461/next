import * as greetingController from "./controllers/greeting";

import { createCallerFactory, createTRPCRouter } from "@/server/trpc/procedure";

const greeting = createTRPCRouter({ ...greetingController });

export const appRouter = createTRPCRouter({ greeting });

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
