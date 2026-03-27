"use client";

import { CookiesProvider } from "react-cookie";

import { cookieOptions } from "@/cookie/setting";

export function ClientCookiesProvider(
  { children }: { children: React.ReactNode },
) {
  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      {children}
    </CookiesProvider>
  );
}
