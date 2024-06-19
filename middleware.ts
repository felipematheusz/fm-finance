import { getUrl } from "./lib/get-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.COOKIE_SESSION as string);
  const pathname = req.nextUrl.pathname;

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL(getUrl("/dashboard")));
  }

  if (pathname.includes("/dashboard") && !token) {
    return NextResponse.redirect(new URL(getUrl("/login")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}