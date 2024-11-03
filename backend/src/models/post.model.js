const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        default:'http://localhost:3000/images/image_1730577177332.jpg'
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
}, {timestamps:true}
)

const Post = mongoose.model('Post',PostSchema);

module.exports = Post