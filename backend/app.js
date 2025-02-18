import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import postRoute from './src/routes/post.route.js';
import uploadRoute from './src/routes/upload.route.js';
import commentRoute from './src/routes/comment.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';  //va nous permettre d'extraire des cookies dans le navigateur du user sans aucun problème
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('MongoDB connected!')})
                                       .catch((err) => {console.log(err);})

const __dirname = path.resolve();

const app = express();

app.use(cookieParser())

app.use(express.json()); 
app.use('/backend/user' , userRoute) //cette manière d'écrire est plus récommandé
app.use('/backend/auth' , authRoute )
app.use('/backend/post' , postRoute)
app.use('/backend/comment' , commentRoute)
app.use('/backend/upload', uploadRoute); //pour upload une image

app.use(express.static(path.join(__dirname, '/frontEnd/dist')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontEnd','dist','index.html'))
})

app.use(cors())

app.listen(3000, () =>{
    console.log('app running on port 3000')
})

app.use((err,req,res,next) => {  //ceci est un middleware qui va me permettre des faire la gestion des erreurs dans mes codes
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
