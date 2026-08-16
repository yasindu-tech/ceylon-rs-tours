import { Schema, models, model, type InferSchemaType } from "mongoose"

const PackageImageSchema = new Schema(
  {
    url: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
)

const PackageSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true, default: "5.0" },
    description: { type: String, required: true },
    images: { type: [PackageImageSchema], default: [] },
  },
  { timestamps: true },
)

export type PackageDoc = InferSchemaType<typeof PackageSchema> & { _id: string }

export const Package = models.Package || model("Package", PackageSchema)
