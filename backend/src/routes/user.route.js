//ce ici qu'on va passer nos différents Endpoints pour le user
import express from 'express';
import {test,updateUser, deleteUser, signOut, getUsers, getUser} from '../controllers/user.controller';
import verifyToken from '../utils/verifyUser';

export const router = express.Router();

router.get('/userss', test);
router.put('/update/:userId', verifyToken ,updateUser); //Pour mettre à jour un utilisateur en vérifiant d'abord le token
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout' , signOut)
router.get('/getUsers', verifyToken, getUsers) //pour get les users mais ceci est juste pour l'administrateur
router.get('/:userId', getUser)