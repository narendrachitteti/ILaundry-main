const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String, // Update to use fullName instead of firstName and lastName
  email: {
    type: String,
    unique: true,
  },


  isActive: {
    type: Boolean,
    default: true // User is active by default
  },
  
  storeId: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type:String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  userType: String,
  password: String,
  confirmPassword: String,

  
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
