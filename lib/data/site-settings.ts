import { unstable_cache } from "next/cache"
import { connectDB } from "@/lib/db"
import { SiteSettings, SITE_SETTINGS_ID, SITE_SETTINGS_SOCIALS_DEFAULT } from "@/lib/models/site-settings"

export interface SiteSettingsData {
  phoneNumber: string
  socials: {
    facebook: string
    instagram: string
    whatsapp: string
  }
}

// Fallback only matters before the one-time migration script has run.
const FALLBACK: SiteSettingsData = {
  phoneNumber: "94717777959",
  socials: SITE_SETTINGS_SOCIALS_DEFAULT,
}

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    await connectDB()
    const doc = await SiteSettings.findById(SITE_SETTINGS_ID).lean<SiteSettingsData | null>()
    if (!doc) return FALLBACK
    return { phoneNumber: doc.phoneNumber, socials: doc.socials }
  },
  ["site-settings"],
  { tags: ["site-settings"] },
)
