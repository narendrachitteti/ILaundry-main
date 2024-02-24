const User = require("../models/registerModels");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, userType, password, confirmPassword } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      userType,
      password,
      confirmPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
    console.log("Registered successfully...  :)");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred while registering. Please try again later.",
    });
  }
};
