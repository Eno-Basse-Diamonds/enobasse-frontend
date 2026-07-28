import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/account", "/admin"];
const authRoutes = ["/sign-in", "/sign-up"];

/**
 * @description Middleware function that handles authentication redirects for protected routes and auth routes
 * @param req - The incoming Next.js request
 * @returns A NextResponse (redirect or next)
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAuthRoute) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      const redirectUrl = token.isAdmin ? "/admin/dashboard" : "/account";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (isAdminRoute) {
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  return NextResponse.next();
}

/** @description Next.js middleware matcher configuration excluding static files, API routes, and public assets */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
