"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface AdminAccount {
  _id: string
  email: string
}

function AccountCard({ account }: { account: AdminAccount }) {
  const router = useRouter()
  const [email, setEmail] = useState(account.email)
  const [password, setPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setError(null)
    const payload: { email?: string; password?: string } = {}
    if (email !== account.email) payload.email = email
    if (password) payload.password = password

    if (!payload.email && !payload.password) {
      toast.info("Nothing changed")
      return
    }
    if (payload.password && payload.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/accounts/${account._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(typeof data?.error === "string" ? data.error : "Failed to update account")
        return
      }
      toast.success("Account updated")
      setPassword("")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{account.email}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor={`email-${account._id}`}>Email</Label>
          <Input
            id={`email-${account._id}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`password-${account._id}`}>New password</Label>
          <Input
            id={`password-${account._id}`}
            type="password"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button size="sm" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </CardContent>
    </Card>
  )
}

export function AccountsManager({ accounts }: { accounts: AdminAccount[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {accounts.map((account) => (
        <AccountCard key={account._id} account={account} />
      ))}
    </div>
  )
}
