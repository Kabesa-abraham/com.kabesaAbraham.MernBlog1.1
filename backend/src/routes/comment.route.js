import express from 'express';
import {createComment, getPostComments, likeComment, editComment, deleteComment, getComments} from '../controllers/comment.controller';
import {verifyToken} from '../utils/verifyUser';


export const router = express();

router.post('/create' ,verifyToken ,createComment)
router.get('/getPostComments/:postId' ,getPostComments)  //ici je ne vérifie pas le token car tout le monde doit voir le token
router.put('/likeComment/:commentId' , verifyToken , likeComment)
router.put('/editComment/:commentId' , verifyToken , editComment)
router.delete('/deleteComment/:commentId' , verifyToken , deleteComment)
router.get('/getComments',verifyToken,getComments )
