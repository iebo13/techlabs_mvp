import { Router } from 'express';
import * as blogController from './blog.controller';

const router = Router();

router.get('/', blogController.getBlogPosts);
router.post('/', blogController.createBlogPost);
router.patch('/:id', blogController.updateBlogPost);
router.delete('/:id', blogController.deleteBlogPost);

export default router;
