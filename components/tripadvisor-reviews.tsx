import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { TripAdvisorReviewsCarousel } from "@/components/tripadvisor-reviews-carousel"
import { getTripAdvisorReviews } from "@/lib/data/tripadvisor-reviews"
import { TRIPADVISOR_LISTING_URL, TRIPADVISOR_WRITE_REVIEW_URL } from "@/lib/tripadvisor-links"
import { ScrollReveal } from "@/components/scroll-reveal"

export async function TripAdvisorReviews() {
  const reviews = await getTripAdvisorReviews()

  // No reviews seeded yet (e.g. migration hasn't run) — skip the section
  // rather than showing an empty carousel.
  if (reviews.length === 0) return null

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-luxvio-gold font-semibold tracking-wider uppercase text-sm">
            Verified Reviews
          </span>
          <h2 className="font-cursive text-5xl md:text-6xl font-bold text-luxvio-teal mt-3">
            What Travelers Say on Tripadvisor
          </h2>
          <p className="text-luxvio-charcoal/70 mt-4 text-lg">
            Real reviews from travelers we&apos;ve had the pleasure of driving around Sri Lanka.
          </p>
        </ScrollReveal>

        <TripAdvisorReviewsCarousel reviews={reviews} />

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={TRIPADVISOR_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-luxvio-teal px-6 py-3 text-sm font-semibold text-luxvio-teal hover:bg-luxvio-teal hover:text-white transition-all"
          >
            See all reviews on Tripadvisor <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href={TRIPADVISOR_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-luxvio-gold px-6 py-3 text-sm font-semibold text-white hover:bg-luxvio-gold/90 transition-all shadow-lg"
          >
            Write a Review on Tripadvisor <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
