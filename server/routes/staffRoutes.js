const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

router.post("/registerStaff", staffController.registerStaff);

router.get('/getNextStaffId', staffController.getNextStaffId);

router.post("/loginStaff", staffController.loginStaff);

router.get('/staffArea/:staffId', staffController.getStaffAreaByStaffId);

router.get("/profile/:staffId", staffController.getStaffProfile);


module.exports = router;
