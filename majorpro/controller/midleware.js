const jwtw=require('jsonwebtoken');

exports.authtoken=(req,res,next)=>{
    const {jwt}=req.cookies;
    if(jwt){
        jwtw.verify(jwt,'tkr',(err,user)=>{
            if(err){
                res.status(403).json("token is invalied")
            }
            req.data=user;
            next();
        })
    }
    else{
        return  res.status(401).json("you are not authenticated");
    }
}
exports.verifyAuthToken=(req,res,next)=>{
    this.authtoken(req,res,()=>{
        if(req.data.id==req.params.id||req.data.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}

exports.verifyAdminToken=(req,res,next)=>{
    this.authtoken(req,res,()=>{
        if(req.data.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}