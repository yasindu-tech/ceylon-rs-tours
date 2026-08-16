import { unstable_cache } from "next/cache"
import { connectDB } from "@/lib/db"
import { TripAdvisorReview } from "@/lib/models/tripadvisor-review"

export interface TripAdvisorReviewData {
  id: string
  author: string
  location: string
  contributions: number
  tripType: string
  date: string
  title: string
  body: string
}

interface TripAdvisorReviewLean {
  _id: unknown
  author: string
  location: string
  contributions: number
  tripType: string
  date: string
  title: string
  body: string
}

export const getTripAdvisorReviews = unstable_cache(
  async (): Promise<TripAdvisorReviewData[]> => {
    await connectDB()
    const docs = await TripAdvisorReview.find()
      .sort({ createdAt: 1 })
      .lean<TripAdvisorReviewLean[]>()
    return docs.map((d) => ({
      id: String(d._id),
      author: d.author,
      location: d.location,
      contributions: d.contributions,
      tripType: d.tripType,
      date: d.date,
      title: d.title,
      body: d.body,
    }))
  },
  ["tripadvisor-reviews"],
  { tags: ["tripadvisor-reviews"] },
)
