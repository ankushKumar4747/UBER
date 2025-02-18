const userModel =require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistToken = require("../models/blacklistToken.model");

module.exports.authUser= async (req,res,next)=>{ 
    const token=req.cookies.token|| req.headers.authorization?.split(" ")[ 1 ]; 
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    const blackList=await blacklistToken.findOne({token:token});
    if(blackList){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        const user=await userModel.findById(decode._id);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        req.user=user;
       return next();

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}