import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Packages } from "@/components/packages"
import { Gallery } from "@/components/gallery"
import { TripAdvisorReviews } from "@/components/tripadvisor-reviews"
import { Footer } from "@/components/footer"
import { TaxiService } from "@/components/taxi-service"
import { WhatsAppLauncher } from "@/components/whatsapp-launcher"
import { getSiteSettings } from "@/lib/data/site-settings"

export default async function Home() {
  const settings = await getSiteSettings()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar whatsappNumber={settings.phoneNumber} />
      <Hero />
      <About />
      <Packages />
      <TaxiService />
      <Gallery />
      <TripAdvisorReviews />
      <Footer />
      <WhatsAppLauncher whatsappNumber={settings.phoneNumber} />
    </main>
  )
}
