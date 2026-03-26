import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/provider/theme-provider";
import { authOptions } from "@/server/auth/auth";
import SessionProvider from "@/server/auth/session-provider";
import { TrpcProvider } from "@/server/trpc/react";
import { type ThemeMode } from "@/utils/theme/hook";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next Template",
  description: "A Next.js starter template",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <SessionProvider session={session}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider initTheme={theme?.value as ThemeMode ?? "light"}>
                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SessionProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
