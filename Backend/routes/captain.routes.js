const express=require('express');
const router=express.Router();
const {body} =require("express-validator")
const captainController=require("../controllers/captain.controller");
const authMiddleware=require("../middleware/auth.middleware")

router.post("/register",[
    body("fullname.firstname").isString().isLength({min:3}).withMessage("firstname must be at least 3 characters long"),
    body("email").isEmail().withMessage("invalid email format"),
    body("password").isString().isLength({min:8}).withMessage("password must be at least 8 characters long"),
    body("vehicle.color").isString().isLength({min:3}).withMessage("color must be at least 3 characters long"),
    body("vehicle.plate").isString().isLength({min:3}).withMessage("plateNumber must be at least 3 characters long"),
    body("vehicle.capacity").isNumeric().isLength({min:1}).withMessage("capacity must be at least 1"),
    body("vehicle.vehicleType").isString().isIn(["car","motorcycle","auto"]).withMessage("vehicle type must be car, motorcycle or auto"),

],captainController.registerCaptain);


router.post("/login",[
    body("email").isEmail().withMessage("invalid email format"),
    body("password").isString().isLength({min:8}).withMessage("password must be at least 8 characters long"),
],captainController.loginCaptain);


router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptainProfile);

module.exports=router;