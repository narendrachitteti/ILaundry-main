// // const express = require("express");
// // const router = express.Router();
// // const billscontroller = require("../controllers/billscontroller");

// // router.post("/billing", billscontroller.billsInvoice);
// // router.get("/next-invoice-no", billscontroller.getAll);
// // router.get("/get-bills", billscontroller.getAll);
// // router.get("/billing", billscontroller.getAll);
// // router.get("/last-invoice-number", billscontroller.getLastInvoiceNumber);

// // module.exports = router;








// // const express = require("express");
// // const router = express.Router();
// // const { 
// //   billsInvoice,
// //   getAll,
// //   getLastInvoiceNumber,
// //   getAllBills,
// //   deleteBilling,
// //   updateBilling // Import the new updateBilling controller function
// // } = require("../controllers/billscontroller");

// // // POST - Create a new billing record
// // router.post("/billing", billsInvoice);

// // // GET - Get next invoice number
// // router.get("/next-invoice-no", getLastInvoiceNumber);

// // // GET - Get all billing records
// // router.get("/get-bills", getAll);

// // // GET - Get last invoice number
// // router.get("/last-invoice-number", getLastInvoiceNumber);

// // // PUT - Update a billing record by ID
// // router.put("/billing/:id", updateBilling);

// // // DELETE - Delete a billing record by ID
// // router.delete("/billing/:id", deleteBilling);

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const billsController = require("../controllers/billscontroller");

// router.post("/billing", billsController.billsInvoice);
// router.get("/next-invoice-no", billsController.getAll);
// router.get("/get-bills", billsController.getAll);
// router.get("/billing", billsController.getAll);
// router.get("/last-invoice-number", billsController.getLastInvoiceNumber);
// router.delete("/billing/:id", billsController.deleteBilling); // New route for deleting a billing record

// module.exports = router;



const express = require("express");
const router = express.Router();
const billsController = require("./controllers/billsController");

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
