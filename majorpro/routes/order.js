const express=require('express');
const routes=express.Router();

const { verifyAuthToken, verifyAdminToken, authtoken } = require('../controller/midleware');
const Order=require('../model/order');
const crypto=require('crypto-js');

//CREATE

routes.post('/',authtoken,async (req,res)=>{
    const newOrder=new Order(req.body);
    try{
        const saveorder=await newOrder.save();
        res.status(200).json(saveorder);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
 routes.put('/:id',verifyAdminToken,async(req,res)=>{
    try{
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },
            {new:true}
            );
            res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
routes.delete('/:id',verifyAdminToken,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("order has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET USER ORDERS

routes.get('/find/:id',verifyAuthToken,async(req,res)=>{
    try{
        const order= await Order.findById(req.params.id);
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//GET  ALL USERS

routes.get('/',verifyAdminToken,async(req,res)=>{
    try{
        const order =await Order.find();
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=routes;