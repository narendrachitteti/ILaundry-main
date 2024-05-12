const AddStore = require("../models/addStoreModel");

// Register store
exports.register = async (req, res) => {
  try {
    // Create a new store instance
    const newStore = new AddStore(req.body);
    // Save the store to the database
    await newStore.save();
    res.status(201).json({ message: "Store registered successfully" });
  } catch (error) {
    console.error("Error registering store:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};


// Admin login
exports.loginAdmin = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const store = await AddStore.findOne({ mobileNumber });
    if (!store || store.password !== password) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }
    // Authentication successful
    res.status(200).json({ mobileNumber: store.mobileNumber, password: store.password });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};
