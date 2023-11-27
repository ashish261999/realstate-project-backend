const User = require("../model/user_model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const errorHandler = require("../util/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created sucessfully!");
  } catch (error) {
    next(error);
  }
};

const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser =await User.findOne({email});
   if(!validUser) return next(errorHandler(404, "User not found !"));
   const validPasword  = bcrypt.compareSync(password, validUser.password);
   if(!validPasword)  return next(errorHandler(401, "wrong credentials!"));
   const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
   const {password: pass , ...rest} = validUser._doc;
   res
   .cookie("acces_token", token , {httpOnly: true})
    .status(200)
    .json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = Signup;
module.exports = Signin;
