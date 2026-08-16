/**
 * Formats a digits-only phone number (e.g. "94717777959", the wa.me-ready
 * format stored in SiteSettings) into a human-readable display string
 * (e.g. "+94 71 777 7959"). Falls back to a plain "+" prefix for numbers
 * that don't match the expected Sri Lankan 11-digit shape.
 */
export function formatPhoneDisplay(digits: string): string {
  const match = digits.match(/^(\d{2})(\d{2})(\d{3})(\d{4})$/)
  if (!match) return `+${digits}`
  const [, cc, a, b, c] = match
  return `+${cc} ${a} ${b} ${c}`
}
