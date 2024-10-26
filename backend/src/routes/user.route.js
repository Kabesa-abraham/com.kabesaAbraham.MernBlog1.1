//ce ici qu'on va passer nos différents Endpoints pour le user
const express = require('express');
const {test,updateUser, deleteUser} = require('../controllers/user.controller');
const verifyToken = require('../utils/verifyUser');

const router = express.Router();

router.get('/userss', test);
router.put('/update/:userId', verifyToken ,updateUser); //Pour mettre à jour un utilisateur en vérifiant d'abord le token
router.delete('/delete/:userId',verifyToken, deleteUser)

module.exports = router;