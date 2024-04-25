const express = require("express");
const router = express.Router();
const billsController = require("../controllers/billsController");

// Create or update a billing record
router.post("/billing", billsController.createOrUpdateBilling);
router.put("/billing/:id", billsController.createOrUpdateBilling);

// Get the last invoice number
router.get("/last-invoice-number", billsController.getLastInvoiceNumber);


router.get("/get-bills", billsController.getAll);

// Get all billing records
router.get("/billing", billsController.getAll);

// Delete a billing record by ID
router.delete("/billing/:id", billsController.deleteBilling);

module.exports = router;