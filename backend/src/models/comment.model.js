const mongoose = require('mongoose');

const SchemaComment = new mongoose.Schema({ //modèl pour le commentaire du poste
    content:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{ //pour le nombres de j'aime
        type:Number,
        default:0
    },
}, {timestamps: true}
);

const Comment = mongoose.model('Comment', SchemaComment);

module.exports = Comment