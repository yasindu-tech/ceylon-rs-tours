import Link from "next/link"
import { connectDB } from "@/lib/db"
import { Package } from "@/lib/models/package"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ADMIN_SEGMENT } from "@/lib/admin-config"

export default async function AdminDashboardPage() {
  await connectDB()
  const packageCount = await Package.countDocuments()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={`/${ADMIN_SEGMENT}/packages`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{packageCount}</p>
              <p className="text-sm text-muted-foreground">tour packages published</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/${ADMIN_SEGMENT}/settings`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update the phone number and social links shown on the site.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
