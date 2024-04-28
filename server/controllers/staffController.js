const StaffModel = require("../models/staffModel");

exports.registerStaff = async (req, res) => {
  const { staffId, phoneNumber, staffArea, password } = req.body;

  try {
    // Check if staff with the same staffId already exists
    const existingStaff = await StaffModel.findOne({ staffId });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff with the same staff ID already exists" });
    }

    // Create a new staff instance
    const newStaff = new StaffModel({
      staffId,
      phoneNumber,
      staffArea,
      password
    });

    // Save the new staff to the database
    await newStaff.save();

    // Send success response
    res.status(201).json({ message: "Staff registration successful" });
  } catch (error) {
    // Handle errors
    console.error("Error registering staff:", error);
    res.status(500).json({
      message: "An error occurred while registering staff. Please try again later."
    });
  }
};


exports.getNextStaffId = async (req, res) => {
  try {
    // Get the last staff ID from the database
    const lastStaff = await StaffModel.findOne({}, {}, { sort: { 'staffId': -1 } });

    let nextStaffId;
    if (lastStaff && lastStaff.staffId) {
      // Increment the last staff ID
      const lastIdNumber = parseInt(lastStaff.staffId.substring(5)); // Assuming staffId format is "STAFF001"
      const nextIdNumber = lastIdNumber + 1;
      nextStaffId = 'STAFF' + nextIdNumber.toString().padStart(3, '0');
    } else {
      // If no staff ID exists, start with STAFF001
      nextStaffId = 'STAFF001';
    }

    res.json({ staffId: nextStaffId });
  } catch (err) {
    console.error('Error getting next staff ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.loginStaff = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    const staff = await StaffModel.findOne({ staffId, password });
    if (!staff) {
      return res.status(400).json({ message: "Invalid staff credentials" });
    }

    // If credentials are valid, send a success response
    res.status(200).json({ message: "Staff login successful" });
  } catch (error) {
    console.error("Error logging in as staff:", error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later."
    });
  }
};

exports.getStaffAreaByStaffId = async (req, res) => {
  const { staffId } = req.params;

  try {
    const staff = await StaffModel.findOne({ staffId });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const staffArea = staff.staffArea; // Changed 'area' to 'staffArea'
    res.status(200).json({ staffArea });
  } catch (error) {
    console.error("Error fetching staff area by staffId:", error);
    res.status(500).json({
      message: "An error occurred while fetching staff area by staffId. Please try again later."
    });
  }
};


exports.getStaffProfile = async (req, res) => {
  try {
    const { staffId } = req.params;

    // Retrieve staff details based on staffId
    const staff = await StaffModel.findOne({ staffId });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff profile:", error);
    res.status(500).json({
      message: "An error occurred while fetching staff profile. Please try again later."
    });
  }
};

