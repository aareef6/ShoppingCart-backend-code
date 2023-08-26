const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    userPassword:{
        type:String
    },
    userEmail:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const model=mongoose.model('User',userSchema);
module.exports=model;