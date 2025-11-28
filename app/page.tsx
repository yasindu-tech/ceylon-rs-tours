import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Packages } from "@/components/packages"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { TaxiService } from "@/components/taxi-service"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Packages />
      <TaxiService />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
