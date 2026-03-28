// Prisma ORM
// https://www.prisma.io/docs/prisma-postgres/quickstart/prisma-orm
// https://www.prisma.io/docs/postgres

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
