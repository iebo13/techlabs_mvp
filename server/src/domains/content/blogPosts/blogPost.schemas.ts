import { z } from 'zod'

export const BlogPostStatusSchema = z.enum(['draft', 'published'])

export const BlogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  author: z.string().min(1),
  tags: z.array(z.string()),
  status: BlogPostStatusSchema,
  publishedAt: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const CreateBlogPostSchema = BlogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
})

export const UpdateBlogPostSchema = BlogPostSchema.partial().required({ id: true })

export type BlogPost = z.infer<typeof BlogPostSchema>
export type CreateBlogPostInput = z.infer<typeof CreateBlogPostSchema>
export type UpdateBlogPostInput = z.infer<typeof UpdateBlogPostSchema>
