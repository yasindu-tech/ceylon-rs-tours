"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import type { TripAdvisorReviewData } from "@/lib/data/tripadvisor-reviews"
import { TRIPADVISOR_LISTING_URL } from "@/lib/tripadvisor-links"

const TRIPADVISOR_GREEN = "#00AA6C"
const AUTOPLAY_MS = 6000

interface TripAdvisorReviewsCarouselProps {
  reviews: TripAdvisorReviewData[]
}

export function TripAdvisorReviewsCarousel({ reviews }: TripAdvisorReviewsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isHovering, setIsHovering] = React.useState(false)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    if (!api || isHovering) return
    const intervalId = setInterval(() => api.scrollNext(), AUTOPLAY_MS)
    return () => clearInterval(intervalId)
  }, [api, isHovering])

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <Carousel
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        className="w-full max-w-sm sm:max-w-3xl lg:max-w-6xl mx-auto"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="basis-11/12 sm:basis-1/2 lg:basis-1/3 pl-4">
              <div className="h-full p-1">
                <ReviewCard review={review} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12" />
        <CarouselNext className="hidden sm:flex -right-4 lg:-right-12" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((review, index) => (
          <button
            key={review.id}
            type="button"
            aria-label={`Go to review ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === selectedIndex ? "w-6 bg-luxvio-gold" : "w-2 bg-gray-200 hover:bg-gray-300",
            )}
          />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: TripAdvisorReviewData }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-luxvio-gold/30 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold tracking-wide" style={{ color: TRIPADVISOR_GREEN }}>
          Tripadvisor
        </span>
        <span className="text-gray-400">
          {review.date} • {review.tripType}
        </span>
      </div>

      <h3 className="font-heading text-lg font-bold text-gray-800 mt-4 mb-2 line-clamp-2">
        {review.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-6 flex-grow">{review.body}</p>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-700">{review.author}</p>
          <p className="text-xs text-gray-400">
            {review.location ? `${review.location} • ` : ""}
            {review.contributions} contribution{review.contributions === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href={TRIPADVISOR_LISTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-luxvio-gold hover:underline"
        >
          Read on Tripadvisor <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
