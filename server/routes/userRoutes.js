const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.registerUser);

// Login route
router.post("/login", UserController.loginUser);
router.get("/getusers", UserController.getAllUsers);
// router.get("/users/:email", UserController.getUserByEmail);
router.post("/login/staff", UserController.loginStaff);
router.get("/api/registerdetails", UserController.getAll);
// Route to get the next store ID
router.get("/getNextStoreId", UserController.getNextStoreId);

// New route to fetch area based on storeId
router.get("/area/:storeId", UserController.getAreaByStoreId);

router.get("/users/:storeId", UserController.getUserByStoreId);


router.get("/api/users/totalStores", UserController.getTotalStores);


module.exports = router;
