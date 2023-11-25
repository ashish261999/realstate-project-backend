const express = require("express");
require("./conn/connect");




const app= express();

app.listen(8080 ,()=>{
    console.log("server is running on port no 8080 !")
})