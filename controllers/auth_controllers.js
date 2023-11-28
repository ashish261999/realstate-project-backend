const User = require("../model/user_model");
const  bcrypt   = require('bcryptjs');
const saltRounds = 10;
const errorHandler = require("../util/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json("user created sucessfully!");
  } catch (error) {
    next(error);
  }
};

// const Signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser =await User.findOne({email});
//    if(!validUser) return next(errorHandler(404, "User not found !"));
//    const validPasword  = bcrypt.compareSync(password, validUser.password);
//    if(!validPasword)  return next(errorHandler(401, "wrong credentials!"));
//    const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
//    const {password: pass , ...rest} = validUser._doc;
//    res
//    .cookie("acces_token", token , {httpOnly: true})
//     .status(200)
//     .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email:email });
    if (!validUser) return next(errorHandler(404, 'User not found !!!!!!'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password : pass, ...others } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

 const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


// module.exports = Signup;
// module.exports = Signin;
module.exports={
  Signup,
  Signin, 
  Google
};