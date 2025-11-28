import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Star, MessageCircle } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    title: "Ancient Cities & Temples",
    duration: "5 Days",
    price: "From $375",
    image: "/temple-ruins.png",
    rating: "4.9",
    description: "Explore the majestic ruins of Polonnaruwa and Anuradhapura, witnessing the grandeur of ancient Sri Lanka.",
  },
  {
    title: "Golden Beaches & Sunsets",
    duration: "3 Days",
    price: "From $225",
    image: "/beach-sunset.png",
    rating: "4.8",
    description: "Relax on the pristine golden sands of the southern coast, surrounded by coconut palms and turquoise waters.",
  },
  {
    title: "Mini Tour Around Srilanka",
    duration: "4 Days",
    price: "From $300",
    image: "/mini-tour-sri-lanka.png",
    rating: "5.0",
    description: "Experience the highlights of Sri Lanka in a compact tour, visiting key cultural sites and scenic spots.",
  },
  {
    title: "Traditional Arts & Culture",
    duration: "6 Days",
    price: "From $450",
    image: "/sri-lankan-dancers.png",
    rating: "4.9",
    description: "Immerse yourself in the rich cultural heritage of Sri Lanka with traditional Kandyan dance performances and rituals.",
  },
]

export function Packages() {
  const whatsappNumber = "94778574816" // Replace with actual number

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-luxvio-cream hover:border-luxvio-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-luxvio-teal shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 text-luxvio-gold fill-current" /> {pkg.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-luxvio-teal text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                  {pkg.price}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-luxvio-charcoal/60 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-luxvio-teal mb-3 group-hover:text-luxvio-gold transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-sm text-luxvio-charcoal/70 mb-6 line-clamp-3 flex-grow">{pkg.description}</p>

                <Button
                  asChild
                  className="w-full bg-luxvio-cream hover:bg-luxvio-teal text-luxvio-teal hover:text-white border border-luxvio-teal/20 group-hover:border-transparent transition-all rounded-xl"
                >
                  <Link
                    href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in booking the ${pkg.title} package.`}
                    target="_blank"
                  >
                    Book via WhatsApp <MessageCircle className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
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
