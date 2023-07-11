import express from 'express';
import blogController from '../../controllers/blogController';

const router = express.Router();

// TODO:In pdf this is PUT request but for the good practice we need to use here POST
router.post('/', blogController.createBlog);

router.get('/:id', blogController.getUserBlogs);

router.get('/:blogId', blogController.getBlogWithComments);

router.delete('/:blogId', blogController.deleteBlog);

router.put('/:blogId/comment', blogController.addComment);

router.delete('/:blogId/comment/:commentId', blogController.deleteComment);

export default router;
