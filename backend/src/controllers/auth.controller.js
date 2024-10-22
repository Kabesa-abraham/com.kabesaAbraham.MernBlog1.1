const User = require("../models/user.model");
const bcryptjs = require('bcryptjs'); //va me permettre de crypter mon mot de passe
const errorHandler = require("../utils/error");

const signup = async(req,res,next) =>{
   const {username,email,password} = req.body;

   if(!username || !email || !password || username=== '' || email=== '' || password=== ''){
    next(errorHandler(400, 'Tout les champs sont obligatoire'))  //la logique de cette erreur se trouve dans le dossier util
   }

   const hashedPassword = bcryptjs.hashSync(password, 10);
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
module.exports= signup;