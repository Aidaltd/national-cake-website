import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminSession = req.cookies.get("nc_admin_session");
  // Also check for standard Supabase auth cookie if present
  const hasSupabaseCookie = Array.from(req.cookies.getAll()).some(
    (c) => c.name.includes("-auth-token") && c.value.length > 20
  );

  const isAuthenticated = Boolean(
    (adminSession && adminSession.value.length > 5) || hasSupabaseCookie
  );

  // If user is at /admin/login
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // Already authenticated, redirect to /admin dashboard
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // For all protected /admin routes: if not authenticated, redirect to /admin/login
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
