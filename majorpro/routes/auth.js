const express=require('express');
const routes=express.Router();
const User=require('../model/user');
const jwt=require('jsonwebtoken');
const crypto=require('crypto-js');


routes.post('/register',async(req,res)=>{
    const encrypted = crypto.AES.encrypt(req.body.userPassword,process.env.CRYPTO_KEY).toString();
    const myuser=new User({
        userName:req.body.userName,
        userPassword:encrypted,
        userEmail:req.body.userEmail
    });
    try{
        const result=await myuser.save()
        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
})

routes.post('/signin',async(req,res)=>{
    
    try{
       const data= await User.findOne({userName:req.body.userName})
    if(!data){
        res.status(401).json({message:"your username is invalied"})
    }
    else {
    const Password=crypto.AES.decrypt(data.userPassword,process.env.CRYPTO_KEY)
    .toString(crypto.enc.Utf8)
    console.log(Password);
    if(Password!==req.body.userPassword){
        res.status(401).json({message:"your password is invalied"})
    }
    else{
        const token=jwt.sign(
            {
                id:data._id,
                isAdmin:data.isAdmin
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:'1hour'
            }
        )
        res.cookie('jwt',token);
        res.json(data);
       
    }
    }
    }
    catch(err){
        res.status(405).json(err);
    }
})


module.exports=routes;