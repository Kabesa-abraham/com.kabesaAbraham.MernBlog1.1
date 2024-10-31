const express = require('express');
const {createComment, getPostComments} = require('../controllers/comment.controller');
const verifyToken = require('../utils/verifyUser');


const router = express();

router.post('/create' ,verifyToken ,createComment)
router.get('/getPostComments/:postId' ,getPostComments)  //ici je ne vérifie pas le token car tout le monde doit voir le token

module.exports = router;