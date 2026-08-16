import Link from "next/link"
import Image from "next/image"
import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ADMIN_SEGMENT } from "@/lib/admin-config"
import { DeletePackageButton } from "@/components/admin/delete-package-button"

interface PackageRow {
  _id: string
  title: string
  duration: string
  price: string
  images: { url: string; order: number }[]
}

function getCover(pkg: PackageRow) {
  return [...pkg.images].sort((a, b) => a.order - b.order)[0]
}

export default async function AdminPackagesPage() {
  await connectDB()
  const docs = await Package.find().sort({ createdAt: 1 }).lean<PackageRow[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Packages</h1>
        <Button asChild>
          <Link href={`/${ADMIN_SEGMENT}/packages/new`}>Add package</Link>
        </Button>
      </div>

      {docs.length === 0 && (
        <div className="rounded-lg border p-6 text-center text-muted-foreground">
          No packages yet.
        </div>
      )}

      {/* Mobile: stacked cards */}
      {docs.length > 0 && (
        <div className="space-y-3 md:hidden">
          {docs.map((pkg) => {
            const cover = getCover(pkg)
            const id = String(pkg._id)
            return (
              <div key={id} className="flex gap-3 rounded-lg border p-3">
                {cover ? (
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                    <Image src={cover.url} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                ) : (
                  <div className="size-16 shrink-0 rounded-md bg-muted" />
                )}
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate font-medium">{pkg.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {pkg.duration} · {pkg.price}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/${ADMIN_SEGMENT}/packages/${id}`}>Edit</Link>
                    </Button>
                    <DeletePackageButton id={id} title={pkg.title} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Desktop: table */}
      {docs.length > 0 && (
        <div className="hidden overflow-x-auto rounded-lg border md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((pkg) => {
                const cover = getCover(pkg)
                const id = String(pkg._id)
                return (
                  <TableRow key={id}>
                    <TableCell>
                      {cover ? (
                        <div className="relative size-12 overflow-hidden rounded-md">
                          <Image src={cover.url} alt="" fill sizes="48px" className="object-cover" />
                        </div>
                      ) : (
                        <div className="size-12 rounded-md bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/${ADMIN_SEGMENT}/packages/${id}`}>Edit</Link>
                        </Button>
                        <DeletePackageButton id={id} title={pkg.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
