import { httpClient } from '@/config/http'
import type { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '../types'

export const blogApi = {
  getAll: async (): Promise<{ blogPosts: BlogPost[] }> => {
    return httpClient.get<{ blogPosts: BlogPost[] }>('/blog')
  },

  create: async (data: CreateBlogPostInput): Promise<{ blogPost: BlogPost }> => {
    return httpClient.post<{ blogPost: BlogPost }, CreateBlogPostInput>('/blog', data)
  },

  update: async (data: UpdateBlogPostInput): Promise<{ blogPost: BlogPost }> => {
    const { id, ...rest } = data
    if (!id) throw new Error('Blog post ID is required for update')
    return httpClient.patch<{ blogPost: BlogPost }, Partial<CreateBlogPostInput>>(`/blog/${id}`, rest)
  },

  delete: async (id: string): Promise<void> => {
    return httpClient.delete(`/blog/${id}`)
  },
}
