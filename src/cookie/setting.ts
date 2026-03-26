type CookieOptions = {
  path?: string;
  secure?: boolean;
  sameSite?: "none" | "lax" | "strict";
  expires?: number | Date;
  domain?: string;
};

export const cookieOptions: CookieOptions = {
  path: "/",
  secure: true,
  sameSite: "none",
};
