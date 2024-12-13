import {Post} from "../models/post.model.js";
import {errorHandler} from "../utils/error.js";


export const createPoste = async(req,res,next) =>{
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

export const getPosts = async(req,res,next) =>{
    //Donc on va utilisé le systeme de requêtes pour pouvoir prendre les infos que vous voulons 
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9; //donc il ya dejà une limite préetablie
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const posts = await Post.find({ //on peut trouver des postes à partir des diffentes moyens grâce aux requêtes
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {  //ici la personne peut chercher une poste grâce à seulement à des mots(phrases) contenu dans les postes
                $or: [
                    {title : { $regex: req.query.searchTerm, $options: 'i' }},
                    {content: {$regex: req.query.searchTerm, $options:'i' }},
                ],
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit) //le sort représente l'ordre dans la quel on veut avoir le info

        const totalPostes = await Post.countDocuments(); //pour prendre le nombre des postes que nous avons

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate(), 
        );

        const lastMonthPostes = await Post.countDocuments({ //pour prendre le nombre de postes mais seulement du mois dernière
            createdAt: {$gte: oneMonthAgo}
        });

        res.status(200).json({ //et on renvoie tout ces données
            posts,
            totalPostes,
            lastMonthPostes
        })
         
    } catch (error) {
        next(error);
    }
}

export const deletePost = async(req,res,next) =>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403 , "Vous n'êtes pas autorisé de supprimer une Poste"))
    }

    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('La Post a été supprimé avec succées');
    } catch (error) {
        next(error);
    }
}

export const updatePost = async(req,res,next) =>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, "Vous n'êtes pas autorisé de supprimer ce Poste"));
    }

    try {
        const updateThisPost = await Post.findByIdAndUpdate(
                               req.params.postId ,
                               {
                                $set:{
                                    title:req.body.title,
                                    category:req.body.category,
                                    content:req.body.content,
                                    image:req.body.image
                                } },
                               {new:true}
    )
    res.status(200).json(updateThisPost)

    } catch (error) {
        next(error)
    }
}