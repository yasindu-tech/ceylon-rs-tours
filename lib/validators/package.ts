import { z } from "zod"

export const PackageImageInput = z.object({
  url: z.string().min(1),
  order: z.number().int().min(0),
})

export const PackageInput = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  rating: z.string().min(1, "Rating is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(PackageImageInput),
})

export type PackageInputData = z.infer<typeof PackageInput>
