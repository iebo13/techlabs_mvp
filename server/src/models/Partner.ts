import mongoose, { type Document, Schema } from 'mongoose'

export type IPartner = Document & {
  name: string
  slug: string
  logoUrl: string
  websiteUrl?: string
  description?: string
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

const partnerSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    logoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

// Index for active partners sorted by order
partnerSchema.index({ isActive: 1, sortOrder: 1 })

export const Partner = mongoose.model<IPartner>('Partner', partnerSchema)
