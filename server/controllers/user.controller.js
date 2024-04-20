const User = require("../models/user.model");
exports.registerUser = async (req, res) => {
  const {
    name,
    storeId,
    userType,
    email,
    password,
    confirmPassword,
    area,
    phoneNumber,
  } = req.body;

  try {
    // Check if user with the same storeId already exists
    const existingUser = await User.findOne({ storeId });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same Store ID already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      fullName,
      storeId,
      area,
      userType,
      email,
      password,
      confirmPassword,
      phoneNumber,
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

exports.loginUser = async (req, res) => {
  const { storeId, password } = req.body;

  try {
    const user = await User.findOne({ storeId, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid StoreId or password" });
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

exports.loginStaff = async (req, res) => {
  const { storeId, password } = req.body;

  try {
    const user = await User.findOne({ storeId, password, userType: "staff" });
    if (!user) {
      return res.status(400).json({ message: "Invalid storeId or password" });
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

exports.getNextStoreId = async (req, res) => {
  try {
    // Get the last store ID from the database
    const lastStore = await User.findOne({}, {}, { sort: { storeId: -1 } });

    let nextStoreId;
    if (lastStore) {
      // Increment the last store ID
      const lastIdNumber = parseInt(lastStore.storeId.substring(4));
      const nextIdNumber = lastIdNumber + 1;
      nextStoreId = "STID" + nextIdNumber.toString().padStart(3, "0");
    } else {
      // If no store ID exists, start with STID001
      nextStoreId = "STID001";
    }

    res.json({ storeId: nextStoreId });
  } catch (err) {
    console.error("Error getting next store ID:", err);
    res.status(500).json({ error: "Internal server error" });
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


exports.getUserByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const user = await User.findOne({ storeId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by storeId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};