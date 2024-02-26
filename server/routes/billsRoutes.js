const express = require("express");
const router = express.Router();
const billscontroller = require("../controllers/billscontroller");

router.post("/billing", billscontroller.billsInvoice);
router.get("/billing", billscontroller.getAll);

module.exports = router;
