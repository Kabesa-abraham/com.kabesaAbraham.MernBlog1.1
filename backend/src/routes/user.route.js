//ce ici qu'on va passer nos différents Endpoints pour le user
const express = require('express');
const {test,updateUser, deleteUser, signOut, getUsers, getUser} = require('../controllers/user.controller');
const verifyToken = require('../utils/verifyUser');

const router = express.Router();

router.get('/userss', test);
router.put('/update/:userId', verifyToken ,updateUser); //Pour mettre à jour un utilisateur en vérifiant d'abord le token
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout' , signOut)
router.get('/getUsers', verifyToken, getUsers) //pour get les users mais ceci est juste pour l'administrateur
router.get('/:userId', getUser)

module.exports = router;