
const Billing = require("../models/billsModel");

const createOrUpdateBilling = async (req, res) => {
  const { id } = req.params;

  try {
    let invoiceNumber = req.body.invoiceNo;

    if (!invoiceNumber) {
      // Generate a new unique invoice number
      invoiceNumber = await generateUniqueInvoiceNumber();
    }

    const storeStatus = req.body.storeStatus || 'SOut'; // Use provided storeStatus or default to 'SOut'
    const factoryStatus = req.body.factoryStatus || 'FOut'; // Use provided factoryStatus or default to 'FOut'

    const newBilling = {
      username: req.body.username,
      invoiceNo: id ? req.body.invoiceNo : invoiceNumber,
      invoiceDate: req.body.invoiceDate,
      deliveryDate: req.body.deliveryDate,
      pickupdate: req.body.pickupdate,
      clientName: req.body.customerName,
      clientContact: req.body.phoneNumber,
      customeraddress: req.body.customeraddress,
      items: req.body.items,
      subTotal: req.body.subTotal,
      discountRate: req.body.discountRate,
      discountAmount: req.body.discountAmount,
      taxRate: req.body.taxRate,
      taxAmount: req.body.taxAmount,
      total: req.body.total,
      selectedCurrency: req.body.selectedCurrency,
      selectedPaymentMode: req.body.selectedPaymentMode,
      storeStatus, // Assign the provided or default storeStatus
      factoryStatus, // Assign the provided or default factoryStatus
    };

    if (id) {
      // Update existing billing record
      const updatedBilling = await Billing.findByIdAndUpdate(id, newBilling, { new: true });
      if (!updatedBilling) {
        return res.status(404).json({ message: "Billing record not found" });
      }
      return res.status(200).json({ message: "Billing record updated successfully", updatedBilling });
    } else {
      // Create new billing record
      const createdBilling = new Billing(newBilling);
      await createdBilling.save();
      return res.status(201).json({ message: "Billing created successfully", invoiceNo: newBilling.invoiceNo });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.invoiceNo) {
      // Handle duplicate key error for invoiceNo
      // Regenerate a new unique invoice number and retry the operation
      const invoiceNumber = await generateUniqueInvoiceNumber();
      req.body.invoiceNo = invoiceNumber;
      return createOrUpdateBilling(req, res); // Retry the operation with the new invoice number
    }

    console.error("Error creating or updating billing record:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

async function generateUniqueInvoiceNumber() {
  let lastInvoiceNumber = 1;

  const lastBilling = await Billing.findOne({}, {}, { sort: { invoiceNo: -1 } });
  if (lastBilling) {
    const lastInvoiceNo = lastBilling.invoiceNo;
    lastInvoiceNumber = parseInt(lastInvoiceNo.substring(3), 10) + 1;
  }

  let invoiceNumber = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;

  // Ensure the generated invoiceNo is unique
  while (await Billing.findOne({ invoiceNo: invoiceNumber })) {
    lastInvoiceNumber++;
    invoiceNumber = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;
  }

  return invoiceNumber;
}


// Get the last invoice number
const getLastInvoiceNumber = async (req, res) => {
  try {
    const lastBilling = await Billing.findOne({}, {}, { sort: { invoiceNo: -1 } });
    let lastInvoiceNumber = 1;

    if (lastBilling) {
      const lastInvoiceNo = lastBilling.invoiceNo;
      lastInvoiceNumber = parseInt(lastInvoiceNo.substring(3), 10) + 1;
    }

    let invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;

    // Ensure the generated invoiceNo is unique
    while (await Billing.findOne({ invoiceNo })) {
      lastInvoiceNumber++;
      invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;
    }

    res.status(200).json({ lastInvoiceNumber: invoiceNo });
  } catch (error) {
    console.error("Error fetching last invoice number:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all billing records
const getAll = async (req, res) => {
  try {
    const billings = await Billing.find({});
    res.status(200).json(billings);
  } catch (error) {
    console.error("Error fetching billing records:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete a billing record by ID
const deleteBilling = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBilling = await Billing.findByIdAndDelete(id);
    if (!deletedBilling) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.status(200).json({ message: "Billing record deleted successfully" });
  } catch (error) {
    console.error("Error deleting billing record:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createOrUpdateBilling,
  getLastInvoiceNumber,
  getAll,
  deleteBilling,
};