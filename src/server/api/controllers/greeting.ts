import { publicProcedure } from "@/server/trpc/procedure";

export const hello = publicProcedure.query(() => {
  return { message: "Hello from tRPC 👋" };
});
