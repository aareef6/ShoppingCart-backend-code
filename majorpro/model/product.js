const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    img:{
        type:String
    },
    categories:{
        type:Array
    },
    size:{
        type:String
    },
    color:{
        type:String
    },
    price:{
        type:Number
    },
    
},{timestamps:true})

const model=mongoose.model('Product',productSchema);
module.exports=model;