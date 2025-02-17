const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first name must be at least 3 characters long"]
        },
        lastname:{
            type:String,
            minlength:[3,"last name must be at least 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"email must be at least 3 characters"]
        },
        password:{
            type:String,
            required:true,

        } ,
        socketId:{
            type:String
        }
})


userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({ _id:this._id},process.env.SECRET_KEY)
        return token;
}

userSchema.methods.comparePassword= async function(){
    return await  bcrypt.compare(this.password, password);
}


userSchema.methods.hashPassword=async function(){
    const salt=await bcrypt.genSalt(10);
    return hashedPassword=await bcrypt.hash(this.password,salt);
}

const userModel=mongoose.model("userModel",userSchema);

module.exports=userModel;