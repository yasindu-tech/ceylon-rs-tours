import { getSiteSettings } from "@/lib/data/site-settings"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <SettingsForm initialData={settings} />
    </div>
  )
}
