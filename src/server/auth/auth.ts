import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prismaAdmin } from "../db";

// To use the custom WKE SSO provider, uncomment the import below and the
// WKESSOProvider entry in the `providers` array, then add the required env vars.
// import WKESSOProvider from "./wke-sso-provider";

import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // Add more custom session fields here, e.g.:
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    newUser: "/",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    signIn: async () => {
      return true;
    },
  },
  adapter: PrismaAdapter(prismaAdmin),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 5000,
      },
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // WKESSOProvider({
    //   clientId: env.WKESSO_CLIENT_ID,
    //   clientSecret: env.WKESSO_CLIENT_SECRET,
    //   allowDangerousEmailAccountLinking: true,
    // }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
