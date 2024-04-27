const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  staffArea: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Staff', staffSchema);
