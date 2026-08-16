import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { isValidObjectId } from "mongoose"
import { requireSession } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { AdminUser } from "@/lib/models/admin-user"
import { AccountUpdateInput } from "@/lib/validators/account"

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 })
  }
  const body = await req.json().catch(() => null)
  const parsed = AccountUpdateInput.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  if (!parsed.data.email && !parsed.data.password) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 })
  }

  const update: { email?: string; passwordHash?: string } = {}
  if (parsed.data.email) update.email = parsed.data.email.toLowerCase().trim()
  if (parsed.data.password) update.passwordHash = await bcrypt.hash(parsed.data.password, 12)

  await connectDB()
  try {
    const doc = await AdminUser.findByIdAndUpdate(id, update, { new: true }).select(
      "_id email createdAt updatedAt",
    )
    if (!doc) return NextResponse.json({ error: "Account not found" }, { status: 404 })
    return NextResponse.json({ account: doc })
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
      return NextResponse.json({ error: "That email is already in use" }, { status: 409 })
    }
    throw err
  }
}
