const jwt = require('jsonwebtoken');
const Customers = require('../models/customer');
require('dotenv').config();

const authenticate = (req,res,next)=>{
    let token = req.headers.auth;
    let decodedToken = jwt.decode(token,process.env.JWT_SECRET);
    Customers.findByPk(decodedToken.id)
    .then(user=>{
        req.user=user;
        next()
    }).catch(err=>{
        console.log(err)
        res.status(403).json({message:'Unauthorised'})
    })
}

module.exports = authenticate;