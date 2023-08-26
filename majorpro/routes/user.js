const express=require('express');
const routes=express.Router();
const { verifyAuthToken, verifyAdminToken } = require('../controller/midleware');
const User=require('../model/user');
const crypto=require('crypto-js');

routes.put('/:id',verifyAuthToken,async(req,res)=>{
    if(req.body.userPassword){
        req.body.userPassword=crypto.AES.encrypt(req.body.userPassword,process.env.CRYPTO_KEY).toString();
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },
            {new:true}
            );
            res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
routes.delete('/:id',verifyAuthToken,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET
routes.get('/find/:id',verifyAdminToken,async(req,res)=>{
    try{
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET  ALL USERS
routes.get('/',verifyAdminToken,async(req,res)=>{
    const query=req.query.new;
    try{
        const user=query ? await User.find().sort({_id:-1}).limit(5): await User.find();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})



module.exports=routes;