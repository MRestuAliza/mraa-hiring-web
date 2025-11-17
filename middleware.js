import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { nextUrl } = req;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set(
      "callbackUrl",
      nextUrl.pathname + nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role || "user";

  if (nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/candidate/jobs", nextUrl.origin));
  }

  if (nextUrl.pathname.startsWith("/candidate") && role !== "user") {
    return NextResponse.redirect(new URL("/admin/jobs", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/candidate/:path*"],
};
