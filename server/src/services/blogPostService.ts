import { BlogPost, type IBlogPost } from '../models/index.js'
import type { PaginationParams, PaginatedResponse } from '../types/index.js'
import { logger } from '../config/logger.js'

type CreateBlogPostInput = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author?: string
  tags?: string[]
  status?: IBlogPost['status']
}

type UpdateBlogPostInput = Partial<CreateBlogPostInput>

export const getAllBlogPosts = async (params: PaginationParams): Promise<PaginatedResponse<IBlogPost>> => {
  const { page, limit, sort = 'createdAt', order = 'desc' } = params

  const skip = (page - 1) * limit
  const sortOrder = order === 'asc' ? 1 : -1

  const [posts, total] = await Promise.all([
    BlogPost.find().sort({ [sort]: sortOrder }).skip(skip).limit(limit),
    BlogPost.countDocuments(),
  ])

  return {
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export const getBlogPostById = async (id: string): Promise<IBlogPost> => {
  const post = await BlogPost.findById(id)

  if (!post) {
    throw new Error('Blog post not found')
  }

  return post
}

export const createBlogPost = async (input: CreateBlogPostInput): Promise<IBlogPost> => {
  const postData = { ...input }

  // Set publishedAt if status is published
  if (input.status === 'published') {
    postData.publishedAt = new Date().toISOString()
  }

  const post = await BlogPost.create(postData)

  logger.info({ postId: post._id, title: post.title }, 'Blog post created')

  return post
}

export const updateBlogPost = async (id: string, input: UpdateBlogPostInput): Promise<IBlogPost> => {
  const existingPost = await BlogPost.findById(id)

  if (!existingPost) {
    throw new Error('Blog post not found')
  }

  // Set publishedAt if status changed to published and not already set
  if (input.status === 'published' && !existingPost.publishedAt) {
    input.publishedAt = new Date().toISOString()
  }

  const post = await BlogPost.findByIdAndUpdate(id, input, { new: true, runValidators: true })

  if (!post) {
    throw new Error('Blog post not found')
  }

  logger.info({ postId: post._id, title: post.title }, 'Blog post updated')

  return post
}

export const deleteBlogPost = async (id: string): Promise<void> => {
  const post = await BlogPost.findByIdAndDelete(id)

  if (!post) {
    throw new Error('Blog post not found')
  }

  logger.info({ postId: id }, 'Blog post deleted')
}
