import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"
import { QuickPriceEditList, type QuickEditPackage } from "@/components/admin/quick-price-edit-list"

interface PackageLean {
  _id: unknown
  title: string
  duration: string
  price: string
  rating: string
  description: string
  images: { url: string; order: number }[]
}

export default async function AdminPricesPage() {
  await connectDB()
  const docs = await Package.find().sort({ createdAt: 1 }).lean<PackageLean[]>()

  const packages: QuickEditPackage[] = docs.map((d) => ({
    id: String(d._id),
    title: d.title,
    duration: d.duration,
    price: d.price,
    rating: d.rating,
    description: d.description,
    images: d.images,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Prices</h1>
        <p className="text-sm text-muted-foreground">
          Edit a price and tap away — it saves and goes live automatically.
        </p>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-lg border p-6 text-center text-muted-foreground">
          No packages yet.
        </div>
      ) : (
        <QuickPriceEditList packages={packages} />
      )}
    </div>
  )
}
