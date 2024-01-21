const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        if(decoded.expiresIn < Math.floor(Date.now() / 1000)){
            res.status(404).send({message: 'Token Expired'});
        }
        else{
            req.body.author = decoded.userId;
            next();
        }
    } catch (error) {
        res.stats(404).send({
            success: false,
            message: 'Unauthorized access'
        })
    }
}

function createToken(id,name){
    const token = jwt.sign({userId:id,name},process.env.TOKEN_SECRET,{algorithm: 'HS256',expiresIn: '1d'});
    return token;
}

module.exports = {authenticate,createToken};