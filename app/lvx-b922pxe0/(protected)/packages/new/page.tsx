import { PackageForm } from "@/components/admin/package-form"

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add package</h1>
      <PackageForm mode="create" />
    </div>
  )
}
