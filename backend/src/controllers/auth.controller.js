const User = require("../models/user.model");
const bcryptjs = require('bcryptjs'); //va me permettre de crypter mon mot de passe
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async(req,res,next) =>{
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

const signin = async(req,res,next) =>{
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

      const token = jwt.sign( {id:validUser._id}, process.env.JWT_SECRET_KEY)

      const {password: pass , ...rest} = validUser._doc; //j'ai mis ça pour que ça déselectionne le password je veux pas qu'on l'affiche

      res.status(200).cookie('access_token', token, { //je renvoi le token sous forme de cookie
         httpOnly:true
      }).json(rest)

   } catch (error) {
      next(error)
   }
}


module.exports= {signup, signin};