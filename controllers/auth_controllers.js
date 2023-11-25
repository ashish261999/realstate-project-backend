const User = require("../model/user_model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

module.exports = Signup;
