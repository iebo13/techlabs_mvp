import { Request, Response, NextFunction } from 'express';
import * as blogService from '../services/blogService';
import { AppError } from '../utils/AppError';

export const getBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPosts = await blogService.getAllBlogPosts();
    res.status(200).json({
      status: 'success',
      results: blogPosts.length,
      data: { blogPosts },
    });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBlogPost = await blogService.createBlogPost(req.body);
    res.status(201).json({
      status: 'success',
      data: { blogPost: newBlogPost },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await blogService.updateBlogPost(req.params.id, req.body);
    if (!blogPost) {
      return next(new AppError('No blog post found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { blogPost },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await blogService.deleteBlogPost(req.params.id);
    if (!blogPost) {
      return next(new AppError('No blog post found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
