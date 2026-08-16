import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function uploadImage(buffer: Buffer): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "luxvio-packages" },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"))
        resolve(result)
      },
    )
    stream.end(buffer)
  })
}
