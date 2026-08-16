import { unstable_cache } from "next/cache"
import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"

export interface PackageImageData {
  url: string
  order: number
}

export interface PackageData {
  id: string
  title: string
  duration: string
  price: string
  rating: string
  description: string
  images: PackageImageData[]
}

interface PackageLean {
  _id: unknown
  title: string
  duration: string
  price: string
  rating: string
  description: string
  images: PackageImageData[]
}

function toPackageData(doc: PackageLean): PackageData {
  return {
    id: String(doc._id),
    title: doc.title,
    duration: doc.duration,
    price: doc.price,
    rating: doc.rating,
    description: doc.description,
    images: [...doc.images].sort((a, b) => a.order - b.order),
  }
}

export const getPackages = unstable_cache(
  async (): Promise<PackageData[]> => {
    await connectDB()
    const docs = await Package.find().sort({ createdAt: 1 }).lean<PackageLean[]>()
    return docs.map(toPackageData)
  },
  ["packages"],
  { tags: ["packages"] },
)

// Not cached — only used by the admin edit form, which always wants the latest doc.
export async function getPackageById(id: string): Promise<PackageData | null> {
  await connectDB()
  try {
    const doc = await Package.findById(id).lean<PackageLean | null>()
    return doc ? toPackageData(doc) : null
  } catch {
    // Malformed id (Mongoose throws a CastError instead of returning null).
    return null
  }
}
