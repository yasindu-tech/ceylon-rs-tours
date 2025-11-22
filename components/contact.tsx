import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-deep-navy text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tropical-turquoise/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-golden-sand/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-tropical-turquoise font-semibold tracking-wider uppercase text-sm">
                Get in Touch
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 leading-tight">
                Plan Your Dream Trip <br /> Today
              </h2>
              <p className="text-white/70 mt-4 text-lg leading-relaxed">
                Ready to start your Sri Lankan adventure? Fill out the form and our travel experts will get back to you
                within 24 hours with a personalized itinerary.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-ocean-blue/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-tropical-turquoise" />
                </div>
                <div>
                  <p className="font-medium text-white">Call / WhatsApp</p>
                  <p className="text-white/70 mt-1">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-ocean-blue/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-tropical-turquoise" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-white/70 mt-1">hello@ceylonrstours.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-ocean-blue/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-tropical-turquoise" />
                </div>
                <div>
                  <p className="font-medium text-white">Visit Us</p>
                  <p className="text-white/70 mt-1">No. 45, Galle Road, Colombo 03, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-dark-grey">
            <h3 className="font-serif text-2xl font-bold text-deep-navy mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-dark-grey/80">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-off-white border-light-grey focus:border-ocean-blue rounded-xl py-5"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark-grey/80">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-off-white border-light-grey focus:border-ocean-blue rounded-xl py-5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-dark-grey/80">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  className="bg-off-white border-light-grey focus:border-ocean-blue rounded-xl py-5"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-dark-grey/80">
                  Tell us about your trip plans
                </label>
                <Textarea
                  id="message"
                  placeholder="I'm looking for a 7-day honeymoon package..."
                  className="bg-off-white border-light-grey focus:border-ocean-blue rounded-xl min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-ocean-blue to-deep-navy hover:from-deep-navy hover:to-ocean-blue text-white rounded-xl py-6 text-lg shadow-lg mt-2"
              >
                Send Message <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
