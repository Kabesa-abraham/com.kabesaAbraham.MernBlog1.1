import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createPoste, deletePost, getPosts, updatePost } from '../controllers/post.controller';

export const router = express.Router();

router.post('/create' ,verifyToken , createPoste );
router.get('/getPosts', getPosts);
router.delete('/deletePost/:postId/:userId' , verifyToken , deletePost)
router.put('/updatePost/:postId/:userId' , verifyToken, updatePost)