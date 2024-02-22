const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  confirmPassword: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
