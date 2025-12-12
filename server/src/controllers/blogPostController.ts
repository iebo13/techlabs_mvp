import type { Request, Response } from 'express'
import { blogPostService } from '../services/index.js'
import { logger } from '../config/logger.js'

export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, sort, order } = req.query

    const result = await blogPostService.getAllBlogPosts({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    })

    res.json(result)
  } catch (error) {
    logger.error({ error }, 'Get all blog posts failed')

    res.status(500).json({
      error: {
        code: 'GET_BLOG_POSTS_FAILED',
        message: 'Failed to retrieve blog posts',
      },
    })
  }
}

export const getBlogPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const post = await blogPostService.getBlogPostById(id)

    res.json({
      data: post,
    })
  } catch (error) {
    logger.error({ error }, 'Get blog post failed')

    res.status(404).json({
      error: {
        code: 'BLOG_POST_NOT_FOUND',
        message: 'Blog post not found',
      },
    })
  }
}

export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await blogPostService.createBlogPost(req.body)

    res.status(201).json({
      data: post,
    })
  } catch (error) {
    logger.error({ error }, 'Create blog post failed')

    res.status(400).json({
      error: {
        code: 'CREATE_BLOG_POST_FAILED',
        message: error instanceof Error ? error.message : 'Failed to create blog post',
      },
    })
  }
}

export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const post = await blogPostService.updateBlogPost(id, req.body)

    res.json({
      data: post,
    })
  } catch (error) {
    logger.error({ error }, 'Update blog post failed')

    res.status(400).json({
      error: {
        code: 'UPDATE_BLOG_POST_FAILED',
        message: error instanceof Error ? error.message : 'Failed to update blog post',
      },
    })
  }
}

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    await blogPostService.deleteBlogPost(id)

    res.status(204).send()
  } catch (error) {
    logger.error({ error }, 'Delete blog post failed')

    res.status(404).json({
      error: {
        code: 'DELETE_BLOG_POST_FAILED',
        message: error instanceof Error ? error.message : 'Failed to delete blog post',
      },
    })
  }
}
