const jwt = require('jsonwebtoken');
const {errorHandler} = require('./error.js');

const verifyToken = (req, res, next) =>{ //ce middleware va me permettre de vérifier le token qui a été générer lors du auth du user
    const token = req.cookies.access_token; //grâce à cookie-parser j'accède au token qui est dans le navigateur
    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err,user) =>{
        if(err){
            return next(errorHandler(401, 'Unauthorized'))
        }
        req.user = user; //donc après vérification le user sera ajouté dans le request
        next();
    })
}

module.exports= verifyToken;