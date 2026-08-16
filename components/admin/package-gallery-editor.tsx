"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowUp, ArrowDown, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface GalleryImage {
  url: string
  order: number
}

interface PackageGalleryEditorProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
}

function reindex(images: GalleryImage[]): GalleryImage[] {
  return images.map((img, i) => ({ ...img, order: i }))
}

export function PackageGalleryEditor({ images, onChange }: PackageGalleryEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sorted = [...images].sort((a, b) => a.order - b.order)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(true)
    try {
      const uploaded: GalleryImage[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error ?? `Failed to upload ${file.name}`)
        }
        const data = await res.json()
        uploaded.push({ url: data.url, order: 0 })
      }
      onChange(reindex([...sorted, ...uploaded]))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  function moveUp(index: number) {
    if (index === 0) return
    const next = [...sorted]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    onChange(reindex(next))
  }

  function moveDown(index: number) {
    if (index === sorted.length - 1) return
    const next = [...sorted]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    onChange(reindex(next))
  }

  function remove(index: number) {
    const next = sorted.filter((_, i) => i !== index)
    onChange(reindex(next))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {sorted.map((img, index) => (
          <div key={img.url} className="relative aspect-square overflow-hidden rounded-lg border">
            <Image src={img.url} alt="" fill sizes="200px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/60 p-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-6 text-white hover:bg-white/20 hover:text-white"
                onClick={() => moveUp(index)}
                disabled={index === 0}
              >
                <ArrowUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-6 text-white hover:bg-white/20 hover:text-white"
                onClick={() => moveDown(index)}
                disabled={index === sorted.length - 1}
              >
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-6 text-white hover:bg-destructive/80 hover:text-white"
                onClick={() => remove(index)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
            {index === 0 && (
              <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                Cover
              </span>
            )}
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="size-4" />
        {uploading ? "Uploading..." : "Add photos"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
