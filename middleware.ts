import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import { ADMIN_LOGIN_PATH, ADMIN_DASHBOARD_PATH } from "@/lib/admin-config"

// Next.js statically analyzes `matcher` at build time and ignores values built
// from imported variables, so this literal must be kept in sync with
// ADMIN_SEGMENT in lib/admin-config.ts by hand.
export const config = {
  matcher: ["/lvx-b922pxe0/:path*"],
}

export async function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === ADMIN_LOGIN_PATH
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value
  const session = token ? await verifySessionToken(token) : null

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url))
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, req.url))
  }

  return NextResponse.next()
}
