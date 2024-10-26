const express = require('express');
const verifyToken = require('../utils/verifyUser');
const createPoste = require('../controllers/post.controller');

const router = express.Router();

router.post('/create' ,verifyToken , createPoste );

module.exports =router;