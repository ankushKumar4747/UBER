const userModel= require("../models/user.model");
const {validationResult} =require("express-validator")
const userService=require("../services/user.servise")



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