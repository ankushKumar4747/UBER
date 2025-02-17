require("dotenv").config();
const express=require("express");
const morgan= require("morgan")
const cors=require("cors");
const connectToDB =require("./DB/db")
const app=express();
const userRoutes =require("./routes/user.routes")
app.use(express.json());
app.use(express.urlencoded({urlencoded:true}))
app.use(cors());



app.use(morgan("dev"))
app.get("/",(req,res)=>{
    res.send("hello");
})

app.use("/users",userRoutes)

module.exports=app;