"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { PackageData } from "@/lib/data/packages"

interface PackagesCarouselProps {
  packages: PackageData[]
  whatsappNumber: string
}

export function PackagesCarousel({ packages, whatsappNumber }: PackagesCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(intervalId)
  }, [api])

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Carousel opts={{ loop: true, align: "center" }} setApi={setApi} className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {packages.map((pkg) => (
              <CarouselItem key={pkg.id} className="basis-11/12 pl-4">
                <div className="h-full p-1">
                  <PackageCard pkg={pkg} whatsappNumber={whatsappNumber} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} whatsappNumber={whatsappNumber} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button
          asChild
          className="bg-luxvio-teal hover:bg-luxvio-gold text-white rounded-full px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
        >
          <Link href={`https://wa.me/${whatsappNumber}?text=Hi, I'd like to customize a tour package.`} target="_blank">
            Customize Your Tour
          </Link>
        </Button>
      </div>
    </>
  )
}

function PackageCard({ pkg, whatsappNumber }: { pkg: PackageData; whatsappNumber: string }) {
  const coverImage = pkg.images[0]?.url ?? "/placeholder.svg"

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={coverImage}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-luxvio-gold shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" /> {pkg.rating}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <div className="absolute -top-5 left-6 bg-luxvio-gold text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg border-4 border-white">
          {pkg.price}
        </div>

        <div className="mt-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-gray-400 mb-2">
            <Clock className="w-3 h-3" />
            <span>{pkg.duration}</span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-gray-800 mb-3 group-hover:text-luxvio-gold transition-colors">
            {pkg.title}
          </h3>

          <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
            {pkg.description}
          </p>

          <Button
            asChild
            variant="outline"
            className="w-full border-luxvio-gold text-luxvio-gold hover:bg-luxvio-gold hover:text-white transition-all rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2"
          >
            <Link
              href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in booking the ${pkg.title} package.`}
              target="_blank"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
