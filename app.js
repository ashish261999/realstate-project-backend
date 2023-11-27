const express = require("express");
require("./conn/connect");
const userRoute = require("./router/user_router");
const authRoute = require("./router/auth_router");

const cors = require('cors');





const app= express();

app.use(express.json());
app.use(cors());

app.listen(8080 ,()=>{
    console.log("server is running on port no 8080 !")
})

app.use("/api" ,userRoute);
app.use("/api",authRoute);

//--error for all files ---- it  is function ---

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Iinternal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})