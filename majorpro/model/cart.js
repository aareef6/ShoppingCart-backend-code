const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    product:[{
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
    
},{timestamps:true})

const model=mongoose.model('Cart',cartSchema);
module.exports=model;