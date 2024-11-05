const express = require('express');
const {createComment, getPostComments, likeComment, editComment, deleteComment} = require('../controllers/comment.controller');
const verifyToken = require('../utils/verifyUser');


const router = express();

router.post('/create' ,verifyToken ,createComment)
router.get('/getPostComments/:postId' ,getPostComments)  //ici je ne vérifie pas le token car tout le monde doit voir le token
router.put('/likeComment/:commentId' , verifyToken , likeComment)
router.put('/editComment/:commentId' , verifyToken , editComment)
router.delete('/deleteComment/:commentId' , verifyToken , deleteComment)

module.exports = router;