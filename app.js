const express = require("express");
require("./conn/connect");
const userRoute = require("./router/user_router");
const authRoute = require("./router/auth_router");




const app= express();
app.use(express.json());

app.listen(8080 ,()=>{
    console.log("server is running on port no 8080 !")
})

app.use("/api" ,userRoute);
app.use("/api",authRoute);