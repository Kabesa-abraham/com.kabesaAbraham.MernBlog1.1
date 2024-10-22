const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const userRoute = require('./src/routes/user.route.js')

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('MongoDB connected!')})
                                       .catch((err) => {console.log(err);})

const app = express();

app.use('/backend/user' , userRoute) //cette manière d'écrire est plus récommandé

app.listen(3000, () =>{
    console.log('app running on port 3000')
})