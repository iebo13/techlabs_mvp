import mongoose, { type Document, Schema } from 'mongoose'

export type BlogPostStatus = 'draft' | 'published' | 'archived'

export type IBlogPost = Document & {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: string
  tags: string[]
  status: BlogPostStatus
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const blogPostSchema = new Schema<IBlogPost>(
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
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      default: 'TechLabs Team',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
    strict: 'throw',
  }
)

// Index for common queries
blogPostSchema.index({ status: 1, publishedAt: -1 })
blogPostSchema.index({ tags: 1, status: 1 })

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema)
