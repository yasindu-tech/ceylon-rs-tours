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

      <div className="overflow-x-auto rounded-lg border">
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
              const cover = [...pkg.images].sort((a, b) => a.order - b.order)[0]
              return (
                <TableRow key={String(pkg._id)}>
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
                        <Link href={`/${ADMIN_SEGMENT}/packages/${String(pkg._id)}`}>Edit</Link>
                      </Button>
                      <DeletePackageButton id={String(pkg._id)} title={pkg.title} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {docs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No packages yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
