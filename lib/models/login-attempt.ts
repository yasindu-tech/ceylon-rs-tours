import { Schema, models, model } from "mongoose"

// Keyed by lowercased email. Tracks brute-force login attempts against the
// admin login route so a guessed password can't be retried indefinitely.
const LoginAttemptSchema = new Schema(
  {
    _id: { type: String, required: true }, // email
    failedCount: { type: Number, required: true, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
)

export const LoginAttempt = models.LoginAttempt || model("LoginAttempt", LoginAttemptSchema)
