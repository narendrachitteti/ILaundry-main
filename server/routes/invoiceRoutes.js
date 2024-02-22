const express = require('express');
const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.post('/invoice', invoiceController.saveInvoice);
router.get('/invoice',invoiceController.getInvoice);
router.put('/invoice/:id', invoiceController.updateInvoice)
module.exports = router;
