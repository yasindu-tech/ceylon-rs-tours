import Image from "next/image"
import { MapPin, UserCheck, Calendar, Headphones } from "lucide-react"

const features = [
  {
    icon: UserCheck,
    title: "Licensed Guides",
    description: "Expert local guides with deep knowledge of Sri Lanka's history and culture.",
  },
  {
    icon: Calendar,
    title: "Custom Itineraries",
    description: "Every trip is tailored to your preferences, pace, and interests.",
  },
  {
    icon: MapPin,
    title: "Private Transport",
    description: "Travel in comfort with our fleet of modern, air-conditioned vehicles.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are always just a call away to ensure your journey is smooth.",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-luxvio-cream relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Image src="/sri-lanka-map-vintage-pattern.jpg" alt="Pattern" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Collage */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 duration-500">
                  <Image src="/sri-lanka-tea-plucker.jpg" alt="Tea Plucker" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 duration-500">
                  <Image src="/sri-lanka-elephant-orphanage.jpg" alt="Elephants" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 duration-500">
                  <Image src="/sri-lanka-sigiriya-rock-fortress.jpg" alt="Sigiriya" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg transform transition hover:-translate-y-2 duration-500">
                  <Image src="/sri-lanka-mirissa-beach.jpg" alt="Beach" fill className="object-cover" />
                </div>
              </div>
            </div>
            {/* Decorative Circle */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-luxvio-teal/5 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">Who We Are</span>
              <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3 leading-tight">
                Why Travel With <br /> <span className="text-luxvio-gold">Luxvio Ceylon?</span>
              </h2>
              <p className="text-luxvio-charcoal/80 mt-4 text-lg leading-relaxed">
                We don't just show you Sri Lanka; we help you feel it. From the misty hills of Ella to the pristine
                beaches of Mirissa, our mission is to create memories that last a lifetime.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-luxvio-cream/50 group"
                >
                  <div className="w-12 h-12 bg-luxvio-teal/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-luxvio-teal transition-colors">
                    <feature.icon className="w-6 h-6 text-luxvio-teal group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-luxvio-teal mb-2">{feature.title}</h3>
                  <p className="text-sm text-luxvio-charcoal/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
