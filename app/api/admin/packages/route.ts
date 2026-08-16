import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { requireSession } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"
import { PackageInput } from "@/lib/validators/package"

export async function GET() {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const docs = await Package.find().sort({ createdAt: 1 }).lean()
  return NextResponse.json({ packages: docs })
}

export async function POST(req: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = PackageInput.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  await connectDB()
  const doc = await Package.create(parsed.data)
  revalidateTag("packages", { expire: 0 })

  return NextResponse.json({ package: doc }, { status: 201 })
}
