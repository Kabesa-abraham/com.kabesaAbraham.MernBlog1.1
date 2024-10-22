const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const userRoute = require('./src/routes/user.route.js')
const authRoute = require('./src/routes/auth.route.js')

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('MongoDB connected!')})
                                       .catch((err) => {console.log(err);})

const app = express();

app.use(express.json()); 
app.use('/backend/user' , userRoute) //cette manière d'écrire est plus récommandé
app.use('/backend/auth' , authRoute )


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
