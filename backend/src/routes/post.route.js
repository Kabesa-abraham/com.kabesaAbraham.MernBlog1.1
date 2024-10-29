const express = require('express');
const verifyToken = require('../utils/verifyUser');
const {createPoste,getPosts, deletePost, updatePost} = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/create' ,verifyToken , createPoste );
router.get('/getPosts', getPosts);
router.delete('/deletePost/:postId/:userId' , verifyToken , deletePost)
router.put('/updatePost/:postId/:userId' , verifyToken, updatePost)

module.exports =router;