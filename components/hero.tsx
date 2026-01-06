import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-sri-lanka.jpg"
          alt="Sri Lanka Landscape"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        {/* Gradient Overlay - Subtle to text visibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center gap-8 mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="text-luxvio-gold">★</span>
          <span className="text-sm font-medium tracking-wider uppercase font-sans">#1 Travel Agency in Sri Lanka</span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] max-w-5xl mx-auto drop-shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          IT'S TIME TO EXPLORE <br />
          <span className="text-luxvio-gold">SRI LANKA</span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Welcome to the Pearl of the Indian Ocean. Experience the true spirit of Ceylon with our tailor-made luxury tours.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Button asChild className="bg-luxvio-gold hover:bg-earth-800 text-white font-bold tracking-wide rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            <Link href="#packages">VIEW DESTINATIONS</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-luxvio-charcoal font-bold tracking-wide rounded-full px-10 py-7 text-lg backdrop-blur-sm hover:scale-105 transition-all"
          >
            <Link href="https://wa.me/94778574816?text=Hi, I'm interested in planning a trip to Sri Lanka." target="_blank">
              PLAN MY TRIP
            </Link>
          </Button>
        </div>
      </div>

      {/* Torn Paper Divider Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] fill-white">
          <path d="M0,0V46.29c47,20.22,85.6.86,134.42,15.65,65.23,19.79,112.55,67.63,169.57,59.27,33.08-4.85,55.19-27.14,79.84-29.61,43.25-4.32,96.53,15.83,141.21,8.34C609.91,79.51,691.86,0,793.1,48c89,42.22,148.88-29.07,192.54-15.06,37.28,12,63.09,40.16,91,48.07,43.29,12.28,68.94-16.73,123.36-1.57V0Z" className="opacity-100"></path>
        </svg>
      </div>
    </section>
  )
}
