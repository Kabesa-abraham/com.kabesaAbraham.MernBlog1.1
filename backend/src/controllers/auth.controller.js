import {User} from "../models/user.model";
import bcryptjs from 'bcryptjs'; //va me permettre de crypter mon mot de passe
import {errorHandler} from "../utils/error";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async(req,res,next) =>{
   const {username,email,password} = req.body;

   if(!username || !email || !password || username=== '' || email=== '' || password=== ''){
    next(errorHandler(400, 'Tout les champs sont obligatoire'))  //la logique de cette erreur se trouve dans le dossier util
   }

   const hashedPassword = bcryptjs.hashSync(password, 10); // j'ai pris le password et je l'ai crypté
   const newUser = new User({ //on n'a pas mis username:username car les noms sont identique alors ce ne plus obligatoire
    username,
    email,
    password : hashedPassword
   });

   try{
    await newUser.save();
    res.json('signup successful')
   }catch(error){
    next(error) // la logique pour ça se trouve dans app.js
   }
   
}

export const signin = async(req,res,next) =>{
  const {email,password} = req.body;

   if(!email || !password || email==="" || password=== ""){
      next(errorHandler(500, 'all fields are required!!'))
   }

   try {
      const validUser = await User.findOne({email});

      if(!validUser){
         return next(errorHandler(404, "User not found"))
      }
      const validPassword = bcryptjs.compareSync(password , validUser.password); //ici on va comparer le passeword inserer par l'utilisateur et celui qui se trouve dans la BBD
      if(!validPassword){
        return next(errorHandler(400 , "Invalid password"))
      }

      const token = jwt.sign( {id:validUser._id , isAdmin:validUser.isAdmin}, process.env.JWT_SECRET_KEY,{expiresIn: '7d'})  //dans ce token j'ai aussi ajouter isAdmin

      const {password: pass , ...rest} = validUser._doc; //j'ai mis ça pour que ça déselectionne le password je veux pas qu'on l'affiche

      res.status(200).cookie('access_token', token, { //je renvoi le token sous forme de cookie
         httpOnly:true,
         maxAge: 7*24*60*60*1000
      }).json(rest)

   } catch (error) {
      next(error)
   }
}

export const google = async(req,res,next) =>{  //cette fonction va permettre de signin ou signup avec votre compte google que vous allez récupérer
   const {name, email, googlePhotoUrl} = req.body;
   try {
      const user = await User.findOne({email});
      if(user){
         const token = jwt.sign({id: user._id ,isAdmin : user.isAdmin}, process.env.JWT_SECRET_KEY)
         const {password, ...rest} = user._doc;

         res.status(200).cookie('access_token' , token , {
           httpOnly:true
         }).json(rest)
      }else{
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); //va géneré un mot de passe qui va contenir des lettres et nombres et on ne prendra que les 8last codes
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

         const newUser = new User({
            username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), //en prenant le nom je l'ai mis en miniscule,supprimer les spaces et mis des nombres aléatoires au devant pour le rendre unique
            email,
            password : hashedPassword,
            profilePicture : googlePhotoUrl
         });
         await newUser.save();
         const token = jwt.sign({id : user._id , isAdmin:newUser.isAdmin}, process.env.JWT_SECRET_KEY);
         const {password, ...rest} = newUser._doc;

         res.status(200).cookie('access_token', token , {
            httpOnly:true
         }).json(rest);
      }
   } catch (error) {
      next(error)}
}
