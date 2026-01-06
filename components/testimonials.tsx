"use client"

import Image from "next/image"
import { MessageCircle, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"

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
    const [api, setApi] = React.useState<CarouselApi>()

    React.useEffect(() => {
        if (!api) {
            return
        }

        const intervalId = setInterval(() => {
            api.scrollNext()
        }, 4000)

        return () => clearInterval(intervalId)
    }, [api])

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

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <Carousel opts={{ loop: true, align: "center" }} setApi={setApi} className="w-full max-w-sm mx-auto">
                        <CarouselContent>
                            {testimonials.map((msg, index) => (
                                <CarouselItem key={index} className="basis-11/12 pl-4">
                                    <div className="h-full p-1">
                                        <TestimonialCard msg={msg} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((msg) => (
                        <TestimonialCard key={msg.id} msg={msg} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestimonialCard({ msg }: { msg: any }) {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-luxvio-gold/30 hover:shadow-2xl transition-all duration-300 group relative h-full flex flex-col">
            {/* Message Icon Badge */}
            <div className="absolute -top-4 -right-4 bg-luxvio-gold text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                <Quote className="w-6 h-6 fill-current" />
            </div>

            <div className="flex items-start gap-5">
                {/* User Image */}
                <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                        src={msg.image}
                        alt={msg.name}
                        fill
                        className="object-cover rounded-full border-2 border-luxvio-cream shadow-sm"
                    />
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="mb-3">
                        <h3 className="font-heading text-lg font-bold text-gray-800">{msg.name}</h3>
                        <p className="text-xs text-luxvio-gold font-bold uppercase tracking-wider font-sans">
                            {msg.location}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-grow">
                <p className="text-gray-600 leading-relaxed italic font-sans">"{msg.message}"</p>
            </div>

            <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-luxvio-gold fill-current" />
                ))}
            </div>
        </div>
    )
}
