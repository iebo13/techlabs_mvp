import mongoose, { type Document, Schema } from 'mongoose'

export type ITrack = Document & {
  name: string
  slug: string
  description: string
  duration: string
  icon?: string
  skills: string[]
  learningOutcomes: string[]
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

const trackSchema = new Schema<ITrack>(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
      type: [String],
      default: [],
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

// Index for active tracks sorted by order
trackSchema.index({ isActive: 1, sortOrder: 1 })

export const Track = mongoose.model<ITrack>('Track', trackSchema)
