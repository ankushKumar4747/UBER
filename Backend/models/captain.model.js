const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const captainSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"firstname must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"lastname must be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"invalid email format"]
    },
    password:{
        type:String,
        required:true,
       select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color must be at least 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plateNumber must be at least 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity must be at least 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
})
captainSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    return token;
}

captainSchema.methods.comparePassword=async function(password){
    const match=await bcrypt.compare(password,this.password);
    return match;
}

captainSchema.methods.hashPassword=async function(password){
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}

const captainModel=mongoose.model("captain",captainSchema);

module.exports=captainModel;