const express=require('express');
const routes=express.Router();

const { verifyAuthToken, verifyAdminToken, authtoken } = require('../controller/midleware');
const Cart=require('../model/cart');
const crypto=require('crypto-js');

//CREATE

routes.post('/',authtoken,async (req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const saveCart=await newCart.save();
        res.status(200).json(saveCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
 routes.put('/:id',verifyAuthToken,async(req,res)=>{
    try{
        const updatedCart=await Cart.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },
            {new:true}
            );
            res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
routes.delete('/:id',verifyAuthToken,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("cart has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET
routes.get('/find/:id',verifyAuthToken,async(req,res)=>{
    try{
        const cart= await Cart.findById(req.params.id);
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET  ALL USERS

routes.get('/',verifyAdminToken,async(req,res)=>{
    try{
        const cart =await Cart.find();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=routes;