require("dotenv").config();
const express=require("express");
const morgan= require("morgan")
const cors=require("cors");
const app=express();

app.use(cors());


app.use(morgan("dev"))
app.get("/",(req,res)=>{
    res.send("hello");
})

module.exports=app;