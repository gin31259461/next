# next-template

A minimal, opinionated Next.js starter — wired up and ready to build on.

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 6 (strict) |
| UI | [MUI v7](https://mui.com) + Emotion — dark/light theme system |
| API | [tRPC v11](https://trpc.io) + TanStack Query v5 |
| Auth | [NextAuth.js v4](https://next-auth.js.org) — Google, Facebook (WKE SSO example included) |
| Database | [Prisma 7](https://prisma.io) + [`@prisma/adapter-pg`](https://www.npmjs.com/package/@prisma/adapter-pg) — PostgreSQL |
| State | [Zustand v5](https://zustand.docs.pmnd.rs) with SSR-safe provider pattern |
| Env validation | [@t3-oss/env-nextjs](https://env.t3.gg) |
| Package manager | [pnpm](https://pnpm.io) |

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in the values in `.env`. Required keys:

- `DATABASE_URL` — PostgreSQL connection string (e.g. `postgresql://user:password@localhost:5432/mydb`)
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — e.g. `http://localhost:3000/api/auth`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from [Google Cloud Console](https://console.developers.google.com)
- `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` — from [Meta for Developers](https://developers.facebook.com)

### 3. Set up the database

Push the schema to your database (creates tables):

```bash
pnpm db-push
```

Or regenerate the Prisma client only (if the DB already has the schema):

```bash
pnpm db-gen
```

> The generated client is output to `generated/prisma/`.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout (MUI + tRPC + NextAuth providers)
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Suspense loading UI
│   ├── globals.css        # Global styles + font-face declarations
│   ├── @auth/             # Parallel route — intercepted login modal
│   ├── _components/       # Layout-level components (LoginContent, LoginDialog)
│   ├── login/             # /login — full-page login fallback
│   ├── fonts/             # Local fonts
│   └── api/
│       ├── auth/          # NextAuth API route
│       └── trpc/          # tRPC API route
├── components/            # Reusable UI components
├── server/
│   ├── api/
│   │   ├── root.ts        # tRPC router — add your routers here
│   │   └── controllers/   # tRPC procedure definitions
│   ├── auth/
│   │   ├── auth.ts        # NextAuth config
│   │   ├── session-provider.tsx
│   │   └── wke-sso-provider.ts  # Custom OAuth provider example (commented out)
│   ├── trpc/              # tRPC client/server setup
│   └── db.ts              # Prisma client singleton (PrismaPg adapter)
├── store/                 # Zustand stores
│   └── adapter/           # SSR-safe Zustand provider pattern
├── types/                 # Shared TypeScript types
├── utils/
│   └── theme/             # MUI theme (color tokens, dark/light hook)
├── cookie/                # Cookie configuration
├── env.mjs                # Validated environment variables
└── pathname.ts            # Route path constants
prisma/
├── schema.prisma          # Database schema (NextAuth tables + your models)
└── migrations/            # Migration history
prisma.config.ts           # Prisma adapter & migrations config
generated/
└── prisma/                # Generated Prisma client (do not edit)
```

## Adding Features

### Adding a tRPC router

1. Create `src/server/api/controllers/my-feature.ts` with your procedures:

```ts
import { z } from "zod";
import { publicProcedure } from "@/server/trpc/procedure";

export const list = publicProcedure.query(() => []);
export const create = publicProcedure
  .input(z.object({ title: z.string() }))
  .mutation(({ input }) => input);
```

2. Register it in `src/server/api/root.ts`:

```ts
import * as myFeatureController from "./controllers/my-feature";
const myFeature = createTRPCRouter({ ...myFeatureController });
export const appRouter = createTRPCRouter({ greeting, myFeature });
```

### Adding a database model

Add models to `prisma/schema.prisma` below the `# Application models` comment, then run:

```bash
pnpm db-push
```

### Enabling WKE SSO

1. Uncomment `WKESSO_*` vars in `.env.example`, `.env`, and `src/env.mjs`
2. Uncomment the `WKESSOProvider` import and entry in `src/server/auth/auth.ts`
3. Review `src/server/auth/wke-sso-provider.ts` for configuration details

### Changing the database

This template uses the Prisma driver adapter pattern (`@prisma/adapter-pg`). To switch databases:

1. Replace `@prisma/adapter-pg` with the appropriate Prisma adapter package (e.g. `@prisma/adapter-neon`, `@prisma/adapter-planetscale`)
2. Update `datasource db.provider` in `prisma/schema.prisma`
3. Update `src/server/db.ts` to use the new adapter
4. Adjust `DATABASE_URL` format in `.env`

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Auto-fix ESLint issues |
| `pnpm db-push` | Push Prisma schema to DB |
| `pnpm db-pull` | Pull DB schema into Prisma |
| `pnpm db-gen` | Generate Prisma client (outputs to `generated/prisma/`) |
