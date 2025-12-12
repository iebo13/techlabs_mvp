import { BlogPostModel, IBlogPost } from '../models/BlogPost';

export const getAllBlogPosts = async (): Promise<IBlogPost[]> => {
  return BlogPostModel.find().sort({ createdAt: -1 });
};

export const createBlogPost = async (data: Partial<IBlogPost>): Promise<IBlogPost> => {
  return BlogPostModel.create(data);
};

export const updateBlogPost = async (id: string, data: Partial<IBlogPost>): Promise<IBlogPost | null> => {
  return BlogPostModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlogPost = async (id: string): Promise<IBlogPost | null> => {
  return BlogPostModel.findByIdAndDelete(id);
};
