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

module.exports = {createComment,getPostComments}