import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SESSION_COOKIE_NAME } from "@/lib/auth"

export async function POST() {
  ;(await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0, path: "/" })
  return NextResponse.json({ ok: true })
}
