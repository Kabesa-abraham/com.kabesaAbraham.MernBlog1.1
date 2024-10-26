const Post = require("../models/post.model");
const errorHandler = require("../utils/error")


const createPoste = async(req,res,next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, "vous n'êtes pas permis de créer un poste"));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, "s'il vous plait tout les champs sont obligatoires"));
    }
    
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body , 
           slug , 
           userId: req.user.id
    });
    
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
       next(error) 
    }
}

module.exports = createPoste