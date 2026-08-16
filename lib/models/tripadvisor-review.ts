import { Schema, models, model, type InferSchemaType } from "mongoose"

const TripAdvisorReviewSchema = new Schema(
  {
    author: { type: String, required: true },
    location: { type: String, default: "" },
    contributions: { type: Number, required: true, default: 0 },
    tripType: { type: String, required: true },
    date: { type: String, required: true }, // display string, e.g. "May 2026"
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
)

export type TripAdvisorReviewDoc = InferSchemaType<typeof TripAdvisorReviewSchema> & { _id: string }

export const TripAdvisorReview =
  models.TripAdvisorReview || model("TripAdvisorReview", TripAdvisorReviewSchema)
