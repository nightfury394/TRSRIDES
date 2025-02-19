import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.endsWith("/admin")
  ) {
    const isAuthenticated = request.cookies.has("admin_session");

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
