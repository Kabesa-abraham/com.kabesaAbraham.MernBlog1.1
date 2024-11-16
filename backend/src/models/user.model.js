import mongoose from 'mongoose';

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
        default: `http://localhost:3000/images/image_1730562348532.png`
    },
    isAdmin: { //pour l'administrateur
        type:Boolean,
        default:false
    },
}, {timestamps: true} //nous avons mis ça pour que ça sauvegarde automatique le temps de création du user et du mise à jour
);

export const User = mongoose.model('User',userSchema)