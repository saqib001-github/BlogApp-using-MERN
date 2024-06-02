import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create,getPosts,deletePosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/getposts',getPosts);
router.use(verifyToken);
router.post('/create',create)
router.delete('/deleteposts/:postId/:userId',deletePosts);
router.put('/updatepost/:postId/:userId',updatePost);

export default router;