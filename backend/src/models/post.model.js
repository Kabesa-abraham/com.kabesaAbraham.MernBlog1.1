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
        default:''
    },
    category:{
        type:String,
        default:'non catégorisé'
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