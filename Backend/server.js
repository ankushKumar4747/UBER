// require("dotenv").config()
const http=require("http");
const app=require("./app")
const connectToDB =require("./DB/db")
const server= http.createServer(app);
const port=process.env.PORT;




server.listen(port,()=>{
    connectToDB();
    console.log(`server is at port ${port}`);
});