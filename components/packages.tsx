"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Star, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const packages = [
  {
    title: "Ancient Cities & Temples",
    duration: "5 Days",
    price: "From $375",
    image: "/temple-ruins.jpg",
    rating: "4.9",
    description: "Explore the majestic ruins of Polonnaruwa and Anuradhapura, witnessing the grandeur of ancient Sri Lanka.",
  },
  {
    title: "Golden Beaches & Sunsets",
    duration: "3 Days",
    price: "From $225",
    image: "/beach-sunset.jpg",
    rating: "4.8",
    description: "Relax on the pristine golden sands of the southern coast, surrounded by coconut palms and turquoise waters.",
  },
  {
    title: "Mini Tour Around Srilanka",
    duration: "4 Days",
    price: "From $300",
    image: "/mini-tour-sri-lanka.jpg",
    rating: "5.0",
    description: "Experience the highlights of Sri Lanka in a compact tour, visiting key cultural sites and scenic spots.",
  },
  {
    title: "Traditional Arts & Culture",
    duration: "6 Days",
    price: "From $450",
    image: "/sri-lankan-dancers.jpg",
    rating: "4.9",
    description: "Immerse yourself in the rich cultural heritage of Sri Lanka with traditional Kandyan dance performances and rituals.",
  },
]

export function Packages() {
  const whatsappNumber = "94717777959" // Replace with actual number
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
    <section id="packages" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">
            Popular Destinations
          </span>
          <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3">Our Most Popular Packages</h2>
          <p className="text-luxvio-charcoal/70 mt-4 text-lg">
            Handpicked itineraries designed to give you the best experience of Sri Lanka in the time you have.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel opts={{ loop: true, align: "center" }} setApi={setApi} className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {packages.map((pkg, index) => (
                <CarouselItem key={index} className="basis-11/12 pl-4">
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
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} whatsappNumber={whatsappNumber} />
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
      </div>
    </section>
  )
}

function PackageCard({ pkg, whatsappNumber }: { pkg: any; whatsappNumber: string }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-luxvio-gold shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" /> {pkg.rating}
        </div>
        {/* Gradient Overlay for bottom text visibility if needed, but we moved price down */}
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
