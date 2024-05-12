const Staff = require('../models/staffModel');

exports.registerStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json({ message: 'Staff registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginStaff = async (req, res) => {
  try {
    const { mobileNumber, password, staffType } = req.body;
    console.log('Login attempt for staff with mobile number:', mobileNumber);
    if (!staffType) {
      return res.status(400).json({ message: 'Staff type is required.' });
    }
    // Find staff by mobile number and staff type
    const staff = await Staff.findOne({ mobileNumber, staffType });
    if (!staff) {
      console.log('Staff not found');
      return res.status(404).json({ message: 'Staff not found.' });
    }
    // Compare passwords (assuming plain text)
    if (staff.password !== password) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password.' });
    }
    // If everything is fine, send success response
    console.log('Staff login successful:', staff);
    res.status(200).json({ message: 'Staff login successful', staff });
  } catch (error) {
    console.error('Error logging in as staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

