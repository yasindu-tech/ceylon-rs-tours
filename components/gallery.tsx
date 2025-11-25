"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

const galleryImages = [
  {
    src: "/customer-airport-welcome.jpg",
    alt: "Warm Welcome to Sri Lanka",
    class: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/customer-group-mountains.jpg",
    alt: "Hill Country Adventures",
    class: "md:row-span-2",
  },
  {
    src: "/customer-transport-mountains.jpg",
    alt: "Premium Transport Service",
    class: "md:row-span-2",
  },
  {
    src: "/customer-galle-fort.jpg",
    alt: "Exploring Galle Fort",
    class: "md:col-span-2",
  },
  {
    src: "/customer-elephant-encounter.jpg",
    alt: "Unforgettable Elephant Encounters",
    class: "col-span-1 row-span-1",
  },
  {
    src: "/customer-couple-colonial.jpg",
    alt: "Exploring Colonial Heritage",
    class: "col-span-1 row-span-1",
  },
  {
    src: "/customer-couple-viewpoint.jpg",
    alt: "Breathtaking Views",
    class: "col-span-1 row-span-1",
  },
  {
    src: "/customer-airport-welcome-2.jpg",
    alt: "Another Happy Arrival",
    class: "col-span-1 row-span-1",
  },
  {
    src: "/customer-botanical-gardens.jpg",
    alt: "Botanical Gardens Walk",
    class: "col-span-1 row-span-1",
  },
  {
    src: "/customer-king-coconut.jpg",
    alt: "Refreshing King Coconuts",
    class: "col-span-1 row-span-1",
  },
]

export function Gallery() {
  const [isExpanded, setIsExpanded] = useState(false)
  const initialItems = 3
  const visibleImages = isExpanded ? galleryImages : galleryImages.slice(0, initialItems)

  return (
    <section id="gallery" className="py-24 bg-luxvio-cream">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">Travel Gallery</span>
          <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3">Our Happy Travelers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {visibleImages.map((img, i) => (
            <div
              key={i}
              className={cn(
                "relative rounded-2xl overflow-hidden group transition-all duration-500",
                img.class || "col-span-1 row-span-1"
              )}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-white font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {galleryImages.length > initialItems && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="border-luxvio-teal text-luxvio-teal hover:bg-luxvio-teal hover:text-white rounded-full px-8 py-6 text-lg transition-all"
            >
              {isExpanded ? (
                <>
                  View Less <ChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  View More <ChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
