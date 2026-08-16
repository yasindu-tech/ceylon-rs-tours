import { z } from "zod"

// zod's .url() only checks that `new URL(v)` doesn't throw — it does not
// restrict the scheme, so "javascript:alert(1)" passes. These values are
// stored and later rendered as <Link href> on the public site, so a
// non-http(s) scheme here would be a stored XSS vector reachable by anyone
// with an admin session.
export const httpUrlOrEmpty = z
  .string()
  .refine((v) => v === "" || /^https?:\/\//i.test(v), "Must be an http:// or https:// URL")
  .refine((v) => v === "" || z.string().url().safeParse(v).success, "Enter a valid URL")

export const SiteSettingsInput = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Digits only, no spaces or symbols (e.g. 94717777959)"),
  socials: z.object({
    facebook: httpUrlOrEmpty,
    instagram: httpUrlOrEmpty,
    whatsapp: httpUrlOrEmpty,
  }),
})

export type SiteSettingsInputData = z.infer<typeof SiteSettingsInput>
