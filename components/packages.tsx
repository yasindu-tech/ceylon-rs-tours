import { getPackages } from "@/lib/data/packages"
import { getSiteSettings } from "@/lib/data/site-settings"
import { PackagesCarousel } from "@/components/packages-carousel"
import { ScrollReveal } from "@/components/scroll-reveal"

export async function Packages() {
  const [packages, settings] = await Promise.all([getPackages(), getSiteSettings()])

  return (
    <section id="packages" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">
            Popular Destinations
          </span>
          <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3">Our Most Popular Packages</h2>
          <p className="text-luxvio-charcoal/70 mt-4 text-lg">
            Handpicked itineraries designed to give you the best experience of Sri Lanka in the time you have.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <PackagesCarousel packages={packages} whatsappNumber={settings.phoneNumber} />
        </ScrollReveal>
      </div>
    </section>
  )
}
