const express=require("express");
const router=express.Router();
const userController=require("../controllers/user.controller")
const authMiddleware=require("../middleware/auth.middleware");
const {body} =require("express-validator")


router.post("/register",[
    body('email').isEmail().withMessage("Invelid email"),
    body("fullname.firstname").isLength(3).withMessage("first name must be more than 3 characters"),
    body("password").isLength(6).withMessage("password must be more tha 6")
],userController.registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength(6).withMessage("password must be more than 6 characters")
]
    ,userController.loginUser);

router.get("/profile",authMiddleware.authUser,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser);

module.exports=router;