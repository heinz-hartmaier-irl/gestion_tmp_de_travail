import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE = "auth_token";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pages protégées
  const isAdmin = pathname.startsWith("/dashboard-admin");
  const isUser = pathname.startsWith("/dashboard-user");

  if (!isAdmin && !isUser) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = (payload as any).role as "admin" | "user";

    // Redirection si rôle incompatible
    if (isAdmin && role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard-user";
      return NextResponse.redirect(url);
    }
    if (isUser && role !== "user") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard-admin";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "expired");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard-admin/:path*", "/dashboard-user/:path*"],
};
