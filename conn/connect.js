const mongoose = require("mongoose");

const Conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ashishranjanmahi07:ranjan@cluster0.rroydld.mongodb.net/"
      )
      .then(() => {
        console.log("connected");
      });
  } catch (error) {
    res.status(400).json({
      message: "Not connected",
    });
  }
};

Conn();