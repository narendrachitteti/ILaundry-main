const express = require("express");
const router = express.Router();
const billscontroller = require("../controllers/billscontroller");

router.post("/billing", billscontroller.billsInvoice);
router.get("/next-invoice-no", billscontroller.getAll);
router.get("/get-bills", billscontroller.getBills);
router.get("/billing", billscontroller.getAll);
router.get("/last-invoice-number", billscontroller.getLastInvoiceNumber);

module.exports = router;
