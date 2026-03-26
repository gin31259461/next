import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "@/env.mjs";
import { PrismaClient } from "@generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

export const createPrismaClient = () =>
  new PrismaClient(
    { adapter },
  );

export const PrismaAdmin = globalThis.prisma ?? createPrismaClient();

if (env.NEXT_PUBLIC_NODE_ENV !== "production") {
  globalThis.prisma = PrismaAdmin;
}
