import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-luxvio-charcoal text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-luxvio-gold/50">
                <Image
                  src="/luxvio-logo.jpg"
                  alt="Luxvio Ceylon Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cursive text-2xl font-bold text-luxvio-gold leading-none">Luxvio</span>
                <span className="font-serif text-[10px] tracking-widest uppercase text-white/80">Ceylon</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner for authentic Sri Lankan travel experiences. We create journeys that inspire,
              connect, and transform.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxvio-teal transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxvio-teal transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxvio-teal transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Packages", "Gallery", "Travel Blog", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/60 hover:text-luxvio-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Packages</h4>
            <ul className="space-y-3">
              {["Cultural Triangle", "Beach Holidays", "Wildlife Safaris", "Hill Country", "Honeymoon Specials"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/60 hover:text-luxvio-gold transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Subscribe to get special offers and travel inspiration.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-luxvio-gold flex-grow"
              />
              <button
                type="submit"
                className="bg-luxvio-gold hover:bg-luxvio-gold/90 text-luxvio-teal px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Luxvio Ceylon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
