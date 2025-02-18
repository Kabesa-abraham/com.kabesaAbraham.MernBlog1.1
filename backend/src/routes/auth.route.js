import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin' , signin);
router.post('/google', google); //le route pour la fonction frontend qu'on va créer

export default router;