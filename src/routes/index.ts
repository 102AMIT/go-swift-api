import express from 'express';
import userRouter from './user/userRoutes';
import blogRouter from './blog/blogRoutes';

const router = express.Router();

// For User
router.use('/users', userRouter);

// For Blog
router.use('/blog', blogRouter);

export default router;