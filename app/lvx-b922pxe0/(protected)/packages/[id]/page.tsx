import { notFound } from "next/navigation"
import { getPackageById } from "@/lib/data/packages"
import { PackageForm } from "@/components/admin/package-form"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPackagePage({ params }: Props) {
  const { id } = await params
  const pkg = await getPackageById(id)
  if (!pkg) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit package</h1>
      <PackageForm mode="edit" initialData={pkg} />
    </div>
  )
}
