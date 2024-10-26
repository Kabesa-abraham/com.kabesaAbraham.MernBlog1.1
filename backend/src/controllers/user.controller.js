//ce ici qu'on mettra toutes nos differentes fonctions de user qu'on va passer dans le dossier routes
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require('bcryptjs');

const test = (req,res) => {
    res.json({message:'salut les gars'}) }

const updateUser = async(req, res, next) =>{ //la fonction pour mettre à jour le user
   if(req.user.id !== req.params.userId){
    return next(errorHandler(401, "Vous n'êtes pas autorisé à mettre à jour cet utilisateur!"))
   }

   if(req.body.password){
    if(req.body.password.length < 6){
      return next(errorHandler(400, 'Le mot de passe doit avoir plus de 6 caractères'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password , 10);
   }

   if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400 , "le Nom d'utilisateur doit être comprise entre 7 à 20 caractères"));
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400 , "le Nom d'utilisateur ne doit pas contenir des espaces"))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400 , "le Nom d'utilisateur ne doit pas contenir des caractères en majuscule"))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400, "le Nom d'utilisateur doit seulement contenir des lettres et nombres"))
    }
   }

   try {
    const updateUser = await User.findByIdAndUpdate(req.params.userId , {
        //$set:req.body faire ça n'est pas une bonne idée
        $set:{
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture, //en sachant que la maintenant on n'as pas encore mis la fonction(frontend) pour upload une image
            password: req.body.password
        }},
        {new : true});
        const {password , ...rest} = updateUser._doc;
        res.status(200).json(rest)
   } catch (error) { next(error)}
    
} 

const deleteUser = async(req,res,next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "Vous n'êtes pas permis à supprimer ce compte"))
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('Utilisateur a été supprimer avec succée')
    } catch (error) { next(error) }

}

module.exports= {test,updateUser,deleteUser};