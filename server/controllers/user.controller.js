const User = require("../models/user.model");
// const Order = require("../models/order.model"); 
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, mobileNumber } =
      req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      confirmPassword,
      mobileNumber,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred while registering. Please try again later.",
    });
  }
};




// SuperAdmin login
exports.loginSuperAdmin = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }
    // Check if the user's account is active
    if (!user.isActive) {
      return res.status(403).json({ message: "Your account is inactive. Please contact an administrator." });
    }
    // Check if the user is a Super Admin
    if (user.userType !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only Super Admins are allowed to login" });
    }
    // Authentication successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};





exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message:
        "An error occurred while fetching users. Please try again later.",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({
        message:
          "An error occurred while fetching users. Please try again later.",
      });
  }
};




exports.getAreaByStoreId = async (req, res) => {
  const { storeId } = req.params;

  try {
    const user = await User.findOne({ storeId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Assuming 'area' is a field in your User model
    const area = user.area;
    res.status(200).json({ area });
  } catch (error) {
    console.error("Error fetching area by storeId:", error);
    res.status(500).json({

      message:
        "An error occurred while fetching area by storeId. Please try again later.",
    });
  }
};


exports.getTotalStores = async (req, res) => {
  try {
    const totalStores = await User.countDocuments();
    res.status(200).json({ totalStores });
  } catch (error) {
    console.error("Error fetching total stores:", error);
    res.status(500).json({
      message:
        "An error occurred while fetching total stores. Please try again later.",
    });
  }
};

exports.activateUser = async (req, res) => {
  const { storeId } = req.body;

  try {
    // Find the user by storeId and update the isActive field to true
    const user = await User.findOneAndUpdate({ storeId }, { isActive: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error("Error activating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while activating user" });
  }
};

exports.deactivateUser = async (req, res) => {
  const { storeId } = req.body;

  try {
    // Find the user by storeId and update the isActive field to false
    const user = await User.findOneAndUpdate({ storeId }, { isActive: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deactivating user" });
  }
};

exports.loginUser = async (req, res) => {
  const { storeId, password } = req.body;

  try {
    const user = await User.findOne({ storeId, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid StoreId or password" });
    }

    // Check if the user's account is active
    if (!user.isActive) {
      return res
        .status(403)
        .json({
          message: "Your account is inactive. Please contact an administrator.",
        });
    }

    // Check if the user is an admin
    if (user.userType !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins are allowed to login" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    // Query the database to fetch all users with userType 'customer'
    const customers = await User.find({ userType: 'customer' });

    // Send the fetched customers as a JSON response
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    // If an error occurs, send an error response
    res.status(500).json({
      message: "An error occurred while fetching customers. Please try again later.",
    });
  }
};



exports.loginStaff = async (req, res) => {
  const { storeId, password } = req.body;

  try {
    const user = await User.findOne({ storeId, password, userType: "staff" });
    if (!user) {
      return res.status(400).json({ message: "Invalid storeId or password" });
    }

    // Check if the user's account is active
    if (!user.isActive) {
      return res.status(403).json({ message: "Your account is inactive. Please contact an administrator." });
    }

    // Authentication successful
    res.status(200).json({ message: "Staff login successful" });
  } catch (error) {
    console.error("Error logging in as staff:", error);
    res.status(500).json({
      message:
        "An error occurred while logging in as staff. Please try again later.",
    });
  }
};






