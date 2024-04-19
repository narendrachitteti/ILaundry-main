// const express = require("express");
// const router = express.Router();
// const billscontroller = require("../controllers/billscontroller");

// router.post("/billing", billscontroller.billsInvoice);
// router.get("/next-invoice-no", billscontroller.getAll);
// router.get("/get-bills", billscontroller.getAll);
// router.get("/billing", billscontroller.getAll);
// router.get("/last-invoice-number", billscontroller.getLastInvoiceNumber);

// module.exports = router;



const express = require("express");
const router = express.Router();
const billsController = require("../controllers/billscontroller");

router.post("/billing", billsController.billsInvoice);
router.get("/next-invoice-no", billsController.getAll);
router.get("/get-bills", billsController.getAll);
router.get("/billing", billsController.getAll);
router.get("/last-invoice-number", billsController.getLastInvoiceNumber);
router.delete("/billing/:id", billsController.deleteBilling); // New route for deleting a billing record

module.exports = router;

