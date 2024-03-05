const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String, // Update to use fullName instead of firstName and lastName
  email: {
    type: String,
    unique: true,
  },
  userType: String,
  password: String,
  confirmPassword: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
