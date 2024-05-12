const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  storeId: String,
  mobileNumber: {
    type: String,
    required: true
  },
  area: {
    type: String,
    
  },
 
  password: String,
  confirmPassword: String,
 
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
