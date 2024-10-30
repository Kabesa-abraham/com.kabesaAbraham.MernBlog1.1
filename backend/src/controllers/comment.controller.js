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

module.exports = createComment