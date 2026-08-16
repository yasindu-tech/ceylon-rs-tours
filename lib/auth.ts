import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "__lvx_session"
const SESSION_DURATION = "90d"

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("Missing SESSION_SECRET environment variable")
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  sub: string
  email: string
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null
    return { sub: payload.sub, email: payload.email }
  } catch {
    return null
  }
}

/** Reads and verifies the session cookie from a Server Component / Route Handler context. */
export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

/** Throws-free guard for Route Handlers: returns the session or null. Callers respond 401 on null. */
export async function requireSession(): Promise<SessionPayload | null> {
  return getSession()
}

export { SESSION_COOKIE_NAME }
