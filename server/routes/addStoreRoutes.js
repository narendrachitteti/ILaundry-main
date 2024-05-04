const express = require("express");
const router = express.Router();
const addStoreController = require("../controllers/addStoreController");

// Define routes
router.post("/register", addStoreController.register);

router.post("/login-admin", addStoreController.loginAdmin);


module.exports = router;
