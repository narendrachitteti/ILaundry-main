const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes
router.post('/', contactController.createContact);

module.exports = router;
