import {Comment} from "../models/comment.model";
import {errorHandler} from "../utils/error";

export const createComment = async(req,res,next) =>{
    try {
        const {content, postId,userId} = req.body;
        
        if(userId !== req.user.id){
            return next(errorHandler(403, "Vous n'êtes pas permis de créer un commentaire!"))
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        })

        await newComment.save();

        res.status(200).json(newComment)

    } catch (error) {
        next(error)
    }
}

export const getPostComments = async(req,res,next) =>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt: -1, //pour que le nouveau commentaire soit le premier
        })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const likeComment = async(req,res,next) =>{
    try {

        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,"commentaire n'a pas été trouvé"));
        }
        const userIndex = comment.likes.indexOf(req.user.id) //je recherche une indice correspondant à l'id du user
        if(userIndex === -1){
            comment.numberOfLikes +=1;
            comment.likes.push(req.user.id);
        }else{
            comment.numberOfLikes -=1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);
        
    } catch (error) {
       next(error) 
    }
}

export const editComment = async(req,res,next) =>{
    try {
        
      const comment = await Comment.findById(req.params.commentId);
      if(!comment){
        return next(errorHandler(404,"commentaire n'a pas été trouvé"))
      }

      if(comment.userId !== req.user.id && !req.user.isAdmin){
        return next(errorHandler(403, "Vous n'êtes pas permis de modifier ce commentaire"))
      }
      
      const editedComment = await Comment.findByIdAndUpdate(
                            req.params.commentId, 
                            {  
                            $set:{
                                content : req.body.content }
                            },
                            { new:true }
       );

       res.status(200).json(editedComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async(req,res,next) =>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'commentaire pas trouvé'))
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, "vous n'êtes pas permis de supprimer ce commentaire"))
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Commentaire supprimé avec succée')
        
    } catch (error) {
        return next(error)
    }
}

export const getComments = async(req,res,next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,"Vous n'etes pas permis de voire tout ces comments"));
    }
    try {

        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? 1 : -1;

        const comments = await Comment.find()
            .sort({ createdAt : sortDirection })
            .skip( startIndex )
            .limit(limit);

        const totalComments = await Comment.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear() , now.getMonth() - 1, now.getDate());
        const lastMonthComments = await Comment.countDocuments({createdAt: {$gte : oneMonthAgo}})

        res.status(200).json({comments,totalComments , lastMonthComments});

    } catch (error) {
        next(error)
    }
}