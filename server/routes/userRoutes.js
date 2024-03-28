const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Registration route
router.post("/register", UserController.registerUser);

// Login route
router.post("/login", UserController.loginUser);
router.get("/getusers", UserController.getAllUsers);
router.get("/users/:email", UserController.getUserByEmail);
router.post("/login/staff", UserController.loginStaff);
router.get("/api/registerdetails" ,UserController.getAll );

module.exports = router;
