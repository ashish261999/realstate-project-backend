
const User = require("../model/user_model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Signup = async (req, res)=>{
  const {username , email, password}= req.body;
  const hashedPassword = bcrypt.hashSync(password,10);
  const newUser = new User ({username , email, password: hashedPassword});
  try{
       await newUser.save();
       res.status(201).json("user created sucessfully!");
  } catch(error){
      res.status(500).json(error.message);
  }
};

module.exports= Signup;