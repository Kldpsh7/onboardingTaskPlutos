const Customers = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.getCustomers = async (req,res) => {
    const customers = await Customers.findAll();
    const names = customers.map(customer=>{
       return {id:customer.id,
        name:customer.name,
        email:customer.email
    }
    });
    res.status(200).json({customers:names});
};

module.exports.customerSignup = async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(name.trim().length===0 || !email.includes('@') || password.trim().length===0){
        res.status(403).json({message:'Please Enter Valid name, email and password'});
    }
    try{
        const customer = await Customers.findOne({where:{email:email}});
        if(customer!==null){
            res.status(401).json({message:'User with this email id already exists'});
        }else{
            const hash = await bcrypt.hash(password,10);
            await Customers.create({name:name,email:email,password:hash});
            res.status(201).json({
                message:'User Added',
                user:{
                    name:name,
                    email:email
                }
            });
        }
    }catch(err){
        console.log(err)
    }
};

module.exports.updateCustomer = async (req,res) => {
    if(!req.body.email|| req.body.email.trim().length===0 || !req.body.email.includes('@')){
        res.status(403).json({message:'Please enter correct email id'})
    }else{
        if(req.body.name.trim().length===0){
            res.status(403).json({message:'Please Enter a valid name'});
        }else{
            const customer = await Customers.findByPk(req.query.id);
            if(customer===null){
                res.status(404).json({message:'User with this id DO NOT exist'});
            }else{
                try{
                    customer.name = req.body.name;
                    customer.email = req.body.email;
                    await customer.save();
                    res.status(201).json({message:'Updated Successfully', user:customer});
                }catch(err){console.log(err)}
            }
        }
    }
}

module.exports.deleteCustomer = async (req,res) => {
    const customer = await Customers.findByPk(req.query.id);
    if(!customer){
        res.status(401).json({message:'User not found'});
    }else{
        try{
            await customer.destroy();
            res.status(200).json({message:'User deleted'});
        }catch(err){console.log(err)}
    }
}

module.exports.customerLogin = async (req,res) => {
    const user = await Customers.findOne({where:{email:req.body.email}});
    if(!user){
        res.status(404).json({message:'User not found'})
    }else{
        bcrypt.compare(req.body.password,user.password,(error,success)=>{
            if(success){
                res.status(200).json({message:'login successfull',token:jwtCrypt(user.id,user.name,user.email)});
            }else{
                res.status(401).json({message:'Incorrect password'});
            }
        })
    }
}

const jwtCrypt = (id,name,email) => {
    return jwt.sign({id,name,email},process.env.JWT_SECRET)
}