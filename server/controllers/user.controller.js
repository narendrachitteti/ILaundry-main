const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  const { fullName, email, userType, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      fullName,
      email,
      userType,
      password,
      confirmPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred while registering. Please try again later.",
    });
  }
};

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({
//       message: "An error occurred while logging in. Please try again later.",
//     });
//   }
// };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password, userType: "staff" });
    if (!user) {
      return res.status(400).json({ message: "you are not Authorized" });
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

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({
      message:
        "An error occurred while fetching user by email. Please try again later.",
    });
  }
};
