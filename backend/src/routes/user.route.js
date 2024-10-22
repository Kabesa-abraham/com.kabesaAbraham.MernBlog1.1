//ce ici qu'on va passer nos différents Endpoints pour le user
const express = require('express');
const test = require('../controllers/user.controller')

const router = express.Router();

router.get('/userss', test)

module.exports = router;