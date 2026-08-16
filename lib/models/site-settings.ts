import { Schema, models, model, type InferSchemaType } from "mongoose"

const SOCIALS_DEFAULT = { facebook: "", instagram: "", whatsapp: "" }

const SiteSettingsSchema = new Schema(
  {
    _id: { type: String, default: "singleton" },
    phoneNumber: { type: String, required: true },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
)

export type SiteSettingsDoc = InferSchemaType<typeof SiteSettingsSchema> & { _id: string }

export const SITE_SETTINGS_ID = "singleton"
export const SITE_SETTINGS_SOCIALS_DEFAULT = SOCIALS_DEFAULT

export const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema)
