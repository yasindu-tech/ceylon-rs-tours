import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData().catch(() => null)
  const file = formData?.get("file")
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const result = await uploadImage(buffer)

  return NextResponse.json({ url: result.secure_url })
}
