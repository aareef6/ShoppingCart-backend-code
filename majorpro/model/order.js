const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
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
    }],
    amount:{
        type:Number
    },
    address:{
        type:Object
    },
    status:{
        type:String,
        default:"pending"
    }
    
},{timestamps:true})

const model=mongoose.model('Order',orderSchema);
module.exports=model;