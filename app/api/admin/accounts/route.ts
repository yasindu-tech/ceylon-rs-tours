import { NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { AdminUser } from "@/lib/models/admin-user"

export async function GET() {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  // Never return passwordHash.
  const docs = await AdminUser.find().select("_id email createdAt updatedAt").lean()
  return NextResponse.json({ accounts: docs })
}
