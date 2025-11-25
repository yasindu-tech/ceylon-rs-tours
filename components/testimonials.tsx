import Image from "next/image"
import { MessageCircle, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
    {
        id: 1,
        name: "Sarah & Tom",
        image: "/customer-couple-colonial.jpg",
        message: "The trip to Galle was absolutely magical! Thank you for the smooth ride and great company. 🏰✨",
        location: "Galle Fort",
    },
    {
        id: 2,
        name: "Jennifer H.",
        image: "/customer-airport-welcome-2.jpg",
        message: "Just landed back home. Missing the coconuts already! 🥥 Best driver ever. Highly recommend!",
        location: "Colombo Airport",
    },
    {
        id: 3,
        name: "The Hiking Crew",
        image: "/customer-group-mountains.jpg",
        message: "That view in Ella was insane! Thanks for recommending the early start. We beat the crowd! 🏔️🙌",
        location: "Ella Rock",
    },
    {
        id: 4,
        name: "Alex & Family",
        image: "/customer-elephant-encounter.jpg",
        message: "Kids loved the elephants! 🐘 Such a safe and comfortable van for the whole family. See you next year!",
        location: "Pinnawala",
    },
]

export function Testimonials() {
    return (
        <section className="py-24 bg-luxvio-cream relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-luxvio-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-luxvio-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">Guest Love</span>
                    <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3">Messages from the Road</h2>
                    <p className="text-luxvio-charcoal/70 mt-4 text-lg">
                        Real feedback from our happy travelers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((msg, index) => (
                        <div
                            key={msg.id}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-luxvio-cream hover:border-luxvio-gold/30 hover:shadow-xl transition-all duration-300 group relative"
                        >
                            {/* Message Icon Badge */}
                            <div className="absolute -top-4 -right-4 bg-luxvio-teal text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6" />
                            </div>

                            <div className="flex items-start gap-6">
                                {/* User Image */}
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={msg.image}
                                        alt={msg.name}
                                        fill
                                        className="object-cover rounded-full border-4 border-luxvio-cream shadow-sm"
                                    />
                                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-serif text-xl font-bold text-luxvio-teal">{msg.name}</h3>
                                            <p className="text-xs text-luxvio-gold font-semibold uppercase tracking-wide">
                                                {msg.location}
                                            </p>
                                        </div>
                                        <Quote className="w-8 h-8 text-luxvio-gold/20 fill-current" />
                                    </div>

                                    <div className="bg-luxvio-cream/50 rounded-2xl rounded-tl-none p-4 mt-2 border border-luxvio-teal/5">
                                        <p className="text-luxvio-charcoal/80 leading-relaxed italic">"{msg.message}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
