const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator")
const blacklistToken=require("../models/blacklistToken.model")
module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()
            })
        }
        const { fullname, email, password, vehicle } = req.body;
        const isCaptainAlreadyExist = await captainModel.findOne({ email: email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({
                message: "captain already exist"
            })
        }
       const user = new captainModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                type: vehicle.vehicleType
            }
        });
        const hashedPassword = await user.hashPassword(password);
        user.password = hashedPassword;
        await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        // const captain = captainService.createCaptain({
        //     firstname: fullname.firstname,
        //     lastname: fullname.lastname,
        //     email,
        //     password: hashedPassword,
        //     color: vehicle.color,
        //     plate: vehicle.plate,
        //     capacity: vehicle.capacity,
        //     type: vehicle.type
        // });

        const token = user.generateToken();
        res.status(200).json({ token, user });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.loginCaptain = async (req, res, next) => {
try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        })
    }
    const {email, password} = req.body;
    const captain =await captainModel.findOne({email: email}).select("+password");
    if(!captain){
        return res.status(400).json({
            message: "captain not found"
        })
    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({
            message: "invalid password"
        })
    }
    const token=captain.generateToken();
    res.cookie("token",token);
    res.status(200).json({token,captain});

}catch(error){
    return res.status(500).json({
        message: error.message
    })
}
}

module.exports.getCaptainProfile=async(req,res,next)=>{
    try{
        const captain=req.captain;
        res.status(200).json({captain});
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.logoutCaptainProfile=async(req,res,next)=>{
try{
    const token=req.cookies.token|| req.headers.authorization?.split(" ")[ 1 ];
    const blackList=await blacklistToken.create({token:token});
    res.clearCookie("token");
    res.status(200).json({
        message:"captain logout"
    })

}catch(error){
    return res.status(500).json({
        message: error.message
    })
}

}