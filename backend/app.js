const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const userRoute = require('./src/routes/user.route.js')
const authRoute = require('./src/routes/auth.route.js')
const postRoute = require('./src/routes/post.route.js')
const uploadRoute = require('./src/routes/upload.route.js')
const commentRoute = require('./src/routes/comment.route.js')
const cors = require('cors');
const cookieParser = require('cookie-parser')  //va nous permettre d'extraire des cookies dans le navigateur du user sans aucun problème
const path = require('path');

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('MongoDB connected!')})
                                       .catch((err) => {console.log(err);})

const __dirnames = path.resolve();

const app = express();

app.use(cookieParser())

app.use(express.json()); 
app.use('/backend/user' , userRoute) //cette manière d'écrire est plus récommandé
app.use('/backend/auth' , authRoute )
app.use('/backend/post' , postRoute)
app.use('/backend/comment' , commentRoute)
app.use('/backend/upload', uploadRoute); //pour upload une image

app.use(express.static(path.join(__dirnames, 'frontEnd/dist')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirnames, 'frontEnd/dist','index.html'))
})

app.use(cors())

app.use('/images' , express.static('upload/images')) //pour l'image uploadé

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
