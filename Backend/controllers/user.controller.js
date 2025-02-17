const userModel= require("../models/user.model");
const {validationResult} =require("express-validator")
const userService=require("../services/user.servise")

const blacklistToken=require("../models/blacklistToken.model")



module.exports.registerUser=async (req,res,next)=>{
  try{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    
    
    const {fullname,email,password}=req.body;
    const newUser=new userModel({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password
    })
   const hashedPassword=await newUser.hashPassword(password);
   const user=await userService.createUser({    
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword
   })

   const token=user.generateAuthToken();
   res.status(200).json({token,user});


  } catch(error){
    return res.status(500).json({
        message:error.message
    })
  } 
}

module.exports.loginUser=async (req,res,next)=>{
    try{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()});
        }
        const {email,password}=req.body;
        const user=await userModel.findOne({email:email}).select("+password");
        if(!user){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        console.log(req.body);
        const isMatch= await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }


        const token=user.generateAuthToken();

        res.cookie("token",token)
        res.status(200).json({token,user});

    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.getUserProfile=async (req,res,next)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.logoutUser=async (req,res,next)=>{
try{
    const token=req.cookies.token|| req.headers.authorization.split(" ")[ 1 ];
    res.clearCookie("token");
    await blacklistToken.create({token});
    res.status(200).json({
        message:"logout success"
    })

}catch(error){
    return res.status(500).json({
        message:error.message
    })
}}