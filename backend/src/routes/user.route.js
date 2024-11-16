//ce ici qu'on va passer nos différents Endpoints pour le user
import express from 'express';
import { deleteUser, getUser, getUsers, signOut, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/userss', test);
router.put('/update/:userId', verifyToken ,updateUser); //Pour mettre à jour un utilisateur en vérifiant d'abord le token
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout' , signOut)
router.get('/getUsers', verifyToken, getUsers) //pour get les users mais ceci est juste pour l'administrateur
router.get('/:userId', getUser)

export default router;