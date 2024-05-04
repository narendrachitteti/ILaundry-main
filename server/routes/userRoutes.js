const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.registerUser);

router.post("/login-superadmin", UserController.loginSuperAdmin);


router.get("/getusers", UserController.getAllUsers);

router.get("/api/registerdetails", UserController.getAll);

// Route to get total stores
router.get("/totalStores", UserController.getTotalStores);

// Route to get total stores
router.get("/totalStores", UserController.getTotalStores);

router.get("/api/users/totalStores", UserController.getTotalStores);
// Route to activate a user
router.post("/api/activate", UserController.activateUser);

// Route to deactivate a user
router.post("/api/deactivate", UserController.deactivateUser);

module.exports = router;
