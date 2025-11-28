import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Car, Plane, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function TaxiService() {
    const whatsappNumber = "94778574816"

    return (
        <section id="taxi-service" className="py-24 bg-luxvio-cream relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
                        <div>
                            <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">
                                Premium Transport
                            </span>
                            <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3 leading-tight">
                                Luxury Taxi & <br /> <span className="text-luxvio-gold">Airport Transfers</span>
                            </h2>
                            <p className="text-luxvio-charcoal/80 mt-4 text-lg leading-relaxed">
                                Travel in style and comfort with our premium fleet. Whether you need an airport pickup, a drop-off at your hotel, or a ride to your next destination, we ensure a smooth and safe journey.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-luxvio-teal/10 flex items-center justify-center shrink-0">
                                    <Plane className="w-6 h-6 text-luxvio-teal" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-luxvio-teal">Airport Pickup & Drop</h3>
                                    <p className="text-sm text-luxvio-charcoal/70 mt-1">
                                        Punctual and reliable transfers to and from Bandaranaike International Airport.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-luxvio-teal/10 flex items-center justify-center shrink-0">
                                    <Car className="w-6 h-6 text-luxvio-teal" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-luxvio-teal">Hotel Transfers</h3>
                                    <p className="text-sm text-luxvio-charcoal/70 mt-1">
                                        Comfortable rides to any hotel or resort across the island.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-luxvio-teal/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-luxvio-teal" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-luxvio-teal">Island-wide Tours</h3>
                                    <p className="text-sm text-luxvio-charcoal/70 mt-1">
                                        Custom transport solutions for your entire Sri Lankan adventure.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="bg-luxvio-teal hover:bg-luxvio-gold text-white rounded-full px-8 py-6 text-lg shadow-lg transition-all hover:scale-105 mt-4"
                        >
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=Hi, I'd like to book a taxi/transport service.`}
                                target="_blank"
                            >
                                Book Your Ride <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/luxury-taxi-sri-lanka.png"
                                alt="Luxury Taxi Service Sri Lanka"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="font-cursive text-3xl mb-2">Travel in Comfort</p>
                                <p className="text-white/90 text-sm">Experience the best of Sri Lanka with our professional chauffeurs.</p>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-luxvio-gold/20 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-luxvio-teal/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    )
}
