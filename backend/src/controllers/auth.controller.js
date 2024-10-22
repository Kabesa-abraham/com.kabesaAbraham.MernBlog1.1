const User = require("../models/user.model");
const bcryptjs = require('bcryptjs') //va me permettre de crypter mon mot de passe

const signup = async(req,res) =>{
   const {username,email,password} = req.body;

   if(!username || !email || !password || username=== '' || email=== '' || password=== ''){
    res.status(400).json({message:'tout les champs sont obligatoire!!'});
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
    res.status(500).json({message:error.message})
   }
   
}
module.exports= signup;