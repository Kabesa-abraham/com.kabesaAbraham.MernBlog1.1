const express = require('express');
const verifyToken = require('../utils/verifyUser');
const {createPoste,getPosts} = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/create' ,verifyToken , createPoste );
router.get('/getPosts', getPosts);

module.exports =router;