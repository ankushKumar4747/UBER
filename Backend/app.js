require("dotenv").config();
const express=require("express");
const morgan= require("morgan")
const cors=require("cors");
const connectToDB =require("./DB/db")
const app=express();
const cookies_parser=require("cookie-parser")
const userRoutes =require("./routes/user.routes")
const captainRoutes=require("./routes/captain.routes");



app.use(express.json());
app.use(express.urlencoded({urlencoded:true}))
app.use(cors());
app.use(cookies_parser());


app.use(morgan("dev"));


app.use("/users",userRoutes)

app.use("/captains",captainRoutes)




module.exports=app;