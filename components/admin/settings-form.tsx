"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { SiteSettingsData } from "@/lib/data/site-settings"
import { httpUrlOrEmpty } from "@/lib/validators/settings"

const SettingsFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Digits only, no spaces or symbols (e.g. 94717777959)"),
  facebook: httpUrlOrEmpty,
  instagram: httpUrlOrEmpty,
  whatsapp: httpUrlOrEmpty,
})

export function SettingsForm({ initialData }: { initialData: SiteSettingsData }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<z.infer<typeof SettingsFormSchema>>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      phoneNumber: initialData.phoneNumber,
      facebook: initialData.socials.facebook,
      instagram: initialData.socials.instagram,
      whatsapp: initialData.socials.whatsapp,
    },
  })

  async function onSubmit(values: z.infer<typeof SettingsFormSchema>) {
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: values.phoneNumber,
          socials: {
            facebook: values.facebook,
            instagram: values.instagram,
            whatsapp: values.whatsapp,
          },
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(typeof data?.error === "string" ? data.error : "Failed to save settings")
        return
      }
      toast.success("Settings saved")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone / WhatsApp number</FormLabel>
              <FormControl>
                <Input placeholder="94717777959" {...field} />
              </FormControl>
              <FormDescription>
                Used site-wide for calls and WhatsApp links. Digits only, with country code, no
                leading +.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="https://www.facebook.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="https://www.instagram.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp link (footer icon)</FormLabel>
              <FormControl>
                <Input placeholder="https://wa.me/94717777959" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save settings"}
        </Button>
      </form>
    </Form>
  )
}
