const Contact = require('../models/ContactModel');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.json('Contact added!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};
