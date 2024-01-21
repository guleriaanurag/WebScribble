const express = require('express');
const bcrpyt = require('bcrypt');
const router = express.Router();
const { createToken } = require('../authentication');
const { check,validationResult } = require('express-validator');
const user = require('../models/user');

const saltRounds = 10;

const validate = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next();
}

router.post(
    '/signup',
    [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({min: 8}).withMessage('Invalid password length')
    ],
    validate,
    async(req,res)=>{
    try {
        const{name,email,password} = req.body;
        const exisitingUser = await user.findOne({email});
        if(exisitingUser){
            res.status(404).send({
                success: false,
                message: 'User already exists'
            })
        }
        else{
            let salt = await bcrpyt.genSalt(saltRounds);
            let hashedPass = await bcrpyt.hash(password,salt);
            const newUser = new user({
                name,
                email,
                password: hashedPass
            })
            const savedUser = await newUser.save();
            const token = createToken(savedUser._id,savedUser.name);
            res.status(201).send({sucess: true,message:'User registered',token})   
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,message:error.message});
    }
})

router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({min: 8}).withMessage('Invalid password length')
    ],
    validate,
    async(req,res)=>{
    try{
        const {email,password} = req.body;
        const loginUser = await user.findOne({email});
        if(loginUser){
            let loginSuccess = await bcrpyt.compare(password,loginUser.password);
            if(loginSuccess){
                const token = createToken(loginUser._id,loginUser.name);
                res.status(201).send({success:true,message:'Login Successful',token});
            }
            else{
                res.send({success: false,message: 'The email/password sent was wrong'});
            }
            // later we will check for login and send jwt token on successful login for auth
        }
        else{
            res.send({success:false,message: 'Wrong credentials , or the user does not exist'})
        }
    }
    catch(error){
        res.status(401).send({sucess:false,message:error.message});
    }
})

module.exports = router;