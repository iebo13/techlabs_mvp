import mongoose, { type Document, Schema } from 'mongoose'

export type IStory = Document & {
  name: string
  role: string
  track: string
  quote: string
  story: string
  imageUrl?: string
  linkedinUrl?: string
  isPublished: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

const storySchema = new Schema<IStory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    track: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    story: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    isPublished: {
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

// Index for published stories sorted by order
storySchema.index({ isPublished: 1, sortOrder: 1 })

export const Story = mongoose.model<IStory>('Story', storySchema)
