const mongoose = require('mongoose');  
  
    

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    dunique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
//   list: [
//     {
//       type: mongoose.Types.ObjectId,
//       ref: "List",
//     },
//   ],
  
} ,
{timestamps:true});


const User = mongoose.model("User" , userSchema);

// module.exports = User;
module.exports = User
