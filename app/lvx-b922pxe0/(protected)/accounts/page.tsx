import { connectDB } from "@/lib/db"
import { AdminUser } from "@/lib/models/admin-user"
import { AccountsManager, type AdminAccount } from "@/components/admin/accounts-manager"

export default async function AdminAccountsPage() {
  await connectDB()
  const docs = await AdminUser.find().select("_id email").lean<AdminAccount[]>()
  const accounts = docs.map((d) => ({ _id: String(d._id), email: d.email }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <p className="text-sm text-muted-foreground">
          Both accounts have full access, including managing each other&apos;s login.
        </p>
      </div>
      <AccountsManager accounts={accounts} />
    </div>
  )
}
