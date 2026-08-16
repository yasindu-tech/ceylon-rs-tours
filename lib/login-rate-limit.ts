import { LoginAttempt } from "@/lib/models/login-attempt"

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes

export async function isLockedOut(email: string): Promise<boolean> {
  const doc = await LoginAttempt.findById(email).lean<{ lockedUntil: Date | null } | null>()
  return !!doc?.lockedUntil && doc.lockedUntil.getTime() > Date.now()
}

export async function recordFailedAttempt(email: string): Promise<void> {
  const doc = await LoginAttempt.findById(email)
  const failedCount = (doc?.failedCount ?? 0) + 1
  const lockedUntil = failedCount >= MAX_FAILED_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MS) : null

  await LoginAttempt.findByIdAndUpdate(
    email,
    { failedCount, lockedUntil },
    { upsert: true },
  )
}

export async function clearFailedAttempts(email: string): Promise<void> {
  await LoginAttempt.findByIdAndDelete(email)
}
