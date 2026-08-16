"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PackageGalleryEditor, type GalleryImage } from "@/components/admin/package-gallery-editor"
import { ADMIN_SEGMENT } from "@/lib/admin-config"
import type { PackageData } from "@/lib/data/packages"

const PackageFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  rating: z.string().min(1, "Rating is required"),
  description: z.string().min(1, "Description is required"),
})

interface PackageFormProps {
  mode: "create" | "edit"
  initialData?: PackageData
}

export function PackageForm({ mode, initialData }: PackageFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>(initialData?.images ?? [])
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<z.infer<typeof PackageFormSchema>>({
    resolver: zodResolver(PackageFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      duration: initialData?.duration ?? "",
      price: initialData?.price ?? "",
      rating: initialData?.rating ?? "5.0",
      description: initialData?.description ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof PackageFormSchema>) {
    setError(null)
    setSubmitting(true)
    try {
      const payload = { ...values, images }
      const url =
        mode === "create" ? "/api/admin/packages" : `/api/admin/packages/${initialData?.id}`
      const method = mode === "create" ? "POST" : "PATCH"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(typeof data?.error === "string" ? data.error : "Failed to save package")
        return
      }

      toast.success(mode === "create" ? "Package created" : "Package updated")
      router.push(`/${ADMIN_SEGMENT}/packages`)
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="5 Days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="From $375" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="4.9" className="max-w-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Photos</FormLabel>
          <PackageGalleryEditor images={images} onChange={setImages} />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save package"}
        </Button>
      </form>
    </Form>
  )
}
