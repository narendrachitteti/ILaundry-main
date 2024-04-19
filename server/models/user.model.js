const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String, // Update to use fullName instead of firstName and lastName
  email: {
    type: String,
    unique: true,
  },
  storeId: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type:Number,
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
