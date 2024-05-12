const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  staffType: {
    type: String,
    enum: ['FactoryStaff', 'StoreStaff'],
    required: true
  }
});


const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
