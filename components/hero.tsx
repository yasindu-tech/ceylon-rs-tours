import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-sri-lanka.png"
          alt="Sri Lanka Landscape"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-deep-navy/60 via-transparent to-black/70"
          style={{
            background: "linear-gradient(180deg, rgba(141,21,58,0.4) 0%, rgba(0,95,86,0.2) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center gap-6 mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="text-golden-sand">★</span>
          <span className="text-sm font-medium tracking-wide">#1 Travel Agency in Sri Lanka</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.1] max-w-5xl mx-auto drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          Ayubowan
        </h1>

        <p className="font-sans text-lg md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Welcome to the Pearl of the Indian Ocean. Experience the true spirit of Ceylon with tailor-made tours and unforgettable adventures.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Button className="bg-gradient-to-r from-tropical-turquoise to-ocean-blue hover:brightness-110 text-white border-none rounded-full px-8 py-6 text-lg shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform hover:scale-105">
            Explore Packages
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-deep-navy rounded-full px-8 py-6 text-lg backdrop-blur-sm transition-transform hover:scale-105"
          >
            Plan Your Trip
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="hidden md:flex gap-12 mt-16 pt-8 border-t border-white/20 animate-in fade-in duration-1000 delay-500">
          <div className="text-center">
            <p className="text-3xl font-bold font-serif">10k+</p>
            <p className="text-sm text-white/80">Happy Travelers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold font-serif">50+</p>
            <p className="text-sm text-white/80">Destinations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold font-serif">4.9/5</p>
            <p className="text-sm text-white/80">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
