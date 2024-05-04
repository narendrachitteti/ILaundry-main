const mongoose = require("mongoose");

const addStoreSchema = new mongoose.Schema({
  storeName: String,
  gstNumber: String,

  state: String,
  city: String,
  area: String,
  address: String,
  pincode: String,
  adminName: String,
  designation: String,
  emailAddress: String,
  mobileNumber: String,
  password: String,
  storeImages: [String], // Assuming you store image URLs
  licenseAgreement: String, // Assuming you store a file path or URL
});

const AddStore = mongoose.model("AddStore", addStoreSchema);

module.exports = AddStore;
