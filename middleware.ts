import { auth } from "@/auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { Role } from "./types";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggingIn = !!req.auth;
  const isAdmin = req?.auth?.user?.role === Role.ADMIN;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  console.log(isAdminRoute);
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggingIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isAdmin && isAdminRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggingIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
