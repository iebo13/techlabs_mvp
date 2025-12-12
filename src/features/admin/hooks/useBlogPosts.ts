import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '../api/blog'
import type { CreateBlogPostInput, UpdateBlogPostInput } from '../types'

export const useBlogPosts = () => {
  const queryClient = useQueryClient()

  const blogPostsQuery = useQuery({
    queryKey: ['admin', 'blog'],
    queryFn: async () => {
      const { blogPosts } = await blogApi.getAll()
      return blogPosts
    },
  })

  const createBlogPostMutation = useMutation({
    mutationFn: (data: CreateBlogPostInput) => blogApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
    },
  })

  const updateBlogPostMutation = useMutation({
    mutationFn: (data: UpdateBlogPostInput) => blogApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
    },
  })

  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: string) => blogApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
    },
  })

  return {
    blogPosts: blogPostsQuery.data ?? [],
    isLoading: blogPostsQuery.isLoading,
    isError: blogPostsQuery.isError,
    error: blogPostsQuery.error,
    createBlogPost: createBlogPostMutation.mutateAsync,
    updateBlogPost: updateBlogPostMutation.mutateAsync,
    deleteBlogPost: deleteBlogPostMutation.mutateAsync,
  }
}
