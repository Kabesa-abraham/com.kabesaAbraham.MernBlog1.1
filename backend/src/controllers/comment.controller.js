const Comment = require("../models/comment.model");
const errorHandler = require("../utils/error");

const createComment = async(req,res,next) =>{
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

const getPostComments = async(req,res,next) =>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt: -1, //pour que le nouveau commentaire soit le premier
        })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

const likeComment = async(req,res,next) =>{
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

const editComment = async(req,res,next) =>{
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

module.exports = {createComment,getPostComments,likeComment,editComment}