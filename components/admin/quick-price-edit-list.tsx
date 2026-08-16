"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface QuickEditPackage {
  id: string
  title: string
  duration: string
  price: string
  rating: string
  description: string
  images: { url: string; order: number }[]
}

function getCover(pkg: QuickEditPackage) {
  return [...pkg.images].sort((a, b) => a.order - b.order)[0]
}

export function QuickPriceEditList({ packages }: { packages: QuickEditPackage[] }) {
  const [prices, setPrices] = useState<Record<string, string>>(
    Object.fromEntries(packages.map((p) => [p.id, p.price])),
  )
  const [savingId, setSavingId] = useState<string | null>(null)
  const lastSavedRef = useRef<Record<string, string>>(
    Object.fromEntries(packages.map((p) => [p.id, p.price])),
  )

  async function savePrice(pkg: QuickEditPackage) {
    const nextPrice = prices[pkg.id]?.trim() ?? ""
    const lastSaved = lastSavedRef.current[pkg.id]

    if (!nextPrice) {
      toast.error("Price can't be empty")
      setPrices((prev) => ({ ...prev, [pkg.id]: lastSaved }))
      return
    }
    if (nextPrice === lastSaved) return

    setSavingId(pkg.id)
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: pkg.title,
          duration: pkg.duration,
          rating: pkg.rating,
          description: pkg.description,
          images: pkg.images,
          price: nextPrice,
        }),
      })
      if (!res.ok) {
        toast.error("Failed to save price")
        setPrices((prev) => ({ ...prev, [pkg.id]: lastSaved }))
        return
      }
      lastSavedRef.current[pkg.id] = nextPrice
      toast.success(`${pkg.title} price updated`)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <>
      {/* Mobile: stacked cards with a large tappable price field */}
      <div className="space-y-3 md:hidden">
        {packages.map((pkg) => {
          const cover = getCover(pkg)
          return (
            <div key={pkg.id} className="flex items-center gap-3 rounded-lg border p-3">
              {cover ? (
                <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                  <Image src={cover.url} alt="" fill sizes="56px" className="object-cover" />
                </div>
              ) : (
                <div className="size-14 shrink-0 rounded-md bg-muted" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{pkg.title}</p>
                <p className="text-sm text-muted-foreground">{pkg.duration}</p>
              </div>
              <Input
                value={prices[pkg.id] ?? ""}
                onChange={(e) => setPrices((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                onBlur={() => savePrice(pkg)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur()
                }}
                disabled={savingId === pkg.id}
                className="w-32 shrink-0 text-right"
              />
            </div>
          )
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => {
              const cover = getCover(pkg)
              return (
                <TableRow key={pkg.id}>
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
                  <TableCell>
                    <Input
                      value={prices[pkg.id] ?? ""}
                      onChange={(e) => setPrices((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                      onBlur={() => savePrice(pkg)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur()
                      }}
                      disabled={savingId === pkg.id}
                      className="w-40"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
