import { z } from "zod"

export const AccountUpdateInput = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
})

export type AccountUpdateInputData = z.infer<typeof AccountUpdateInput>
