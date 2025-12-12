import mongoose, { type Document, Schema } from 'mongoose'

export type EventType =
  | 'workshop'
  | 'meetup'
  | 'hackathon'
  | 'networking'
  | 'career'
  | 'social'
  | 'bootcamp'
  | 'panel'
  | 'graduation'

export type IEvent = Document & {
  title: string
  slug: string
  type: EventType
  date: Date
  location: string
  blurb: string
  description?: string
  imageUrl?: string
  registrationUrl?: string
  capacity?: number
  registeredCount: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    type: {
      type: String,
      required: true,
      enum: ['workshop', 'meetup', 'hackathon', 'networking', 'career', 'social', 'bootcamp', 'panel', 'graduation'],
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    blurb: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    registrationUrl: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 0,
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

// Index for common queries
eventSchema.index({ date: -1, isPublished: 1 })
eventSchema.index({ type: 1, date: -1 })

export const Event = mongoose.model<IEvent>('Event', eventSchema)
