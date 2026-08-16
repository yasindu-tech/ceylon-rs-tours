import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireSession } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { SiteSettings, SITE_SETTINGS_ID } from "@/lib/models/site-settings"
import { SiteSettingsInput } from "@/lib/validators/settings"

export async function GET() {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const doc = await SiteSettings.findById(SITE_SETTINGS_ID).lean()
  return NextResponse.json({ settings: doc })
}

export async function PUT(req: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = SiteSettingsInput.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  await connectDB()
  const doc = await SiteSettings.findByIdAndUpdate(SITE_SETTINGS_ID, parsed.data, {
    new: true,
    upsert: true,
  })

  revalidateTag("site-settings", { expire: 0 })
  return NextResponse.json({ settings: doc })
}
