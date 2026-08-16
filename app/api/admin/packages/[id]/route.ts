import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { isValidObjectId } from "mongoose"
import { requireSession } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"
import { PackageInput } from "@/lib/validators/package"

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 })
  }
  const body = await req.json().catch(() => null)
  const parsed = PackageInput.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  await connectDB()
  const doc = await Package.findByIdAndUpdate(id, parsed.data, { new: true })
  if (!doc) return NextResponse.json({ error: "Package not found" }, { status: 404 })

  revalidateTag("packages", { expire: 0 })
  return NextResponse.json({ package: doc })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 })
  }
  await connectDB()
  const doc = await Package.findByIdAndDelete(id)
  if (!doc) return NextResponse.json({ error: "Package not found" }, { status: 404 })

  revalidateTag("packages", { expire: 0 })
  return NextResponse.json({ ok: true })
}
