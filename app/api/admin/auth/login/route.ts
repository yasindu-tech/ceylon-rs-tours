import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { connectDB } from "@/lib/db"
import { AdminUser } from "@/lib/models/admin-user"
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"
import { isLockedOut, recordFailedAttempt, clearFailedAttempts } from "@/lib/login-rate-limit"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const GENERIC_ERROR = "Invalid email or password"
const LOCKED_ERROR = "Too many failed attempts. Try again in 15 minutes."

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
  }

  const email = parsed.data.email.toLowerCase().trim()

  await connectDB()

  if (await isLockedOut(email)) {
    return NextResponse.json({ error: LOCKED_ERROR }, { status: 429 })
  }

  const user = await AdminUser.findOne({ email })
  const valid = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false

  if (!user || !valid) {
    await recordFailedAttempt(email)
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 })
  }

  await clearFailedAttempts(email)

  const token = await createSessionToken({ sub: String(user._id), email: user.email })
  ;(await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 90 days, matches session JWT expiry
  })

  return NextResponse.json({ ok: true })
}
