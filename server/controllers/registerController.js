const User = require("../models/registerModels");

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
      password, // Remember to hash the password before saving it to the database
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