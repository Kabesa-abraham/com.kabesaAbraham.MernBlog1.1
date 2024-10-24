const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:''
    }
}, {timestamps: true} //nous avons mis ça pour que ça sauvegarde automatique le temps de création du user et du mise à jour
);

const User = mongoose.model('User',userSchema)

module.exports=User;