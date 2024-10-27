const express = require('express');
const verifyToken = require('../utils/verifyUser');
const createPoste = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/create' ,verifyToken , createPoste );

module.exports =router;