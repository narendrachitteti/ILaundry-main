const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Route to handle staff registration
router.post('/staff', staffController.registerStaff);

// Route to handle staff login
router.post('/staff/login', staffController.loginStaff);


module.exports = router;
