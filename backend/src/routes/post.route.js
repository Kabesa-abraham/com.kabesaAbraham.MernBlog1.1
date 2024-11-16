import express from 'express';
import {verifyToken} from '../utils/verifyUser';
import {createPoste,getPosts, deletePost, updatePost} from '../controllers/post.controller.js';

export const router = express.Router();

router.post('/create' ,verifyToken , createPoste );
router.get('/getPosts', getPosts);
router.delete('/deletePost/:postId/:userId' , verifyToken , deletePost)
router.put('/updatePost/:postId/:userId' , verifyToken, updatePost)