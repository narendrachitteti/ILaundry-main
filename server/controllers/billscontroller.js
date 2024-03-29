const Billing = require("../models/billsModel");

const billsInvoice = async (req, res) => {
  try {
    const count = await Billing.countDocuments();
    const invoiceNumber = `INV${(count + 1).toString().padStart(5, '0')}`;

    const invoiceDate = new Date(req.body.invoiceDate);
    
    const newBilling = new Billing({ 
      user: {
        userId: req.body.user.userId,
        fullName: req.body.user.fullName,
      },
      username: req.body.username,
      invoiceNo: invoiceNumber,
      invoiceDate: req.body.invoiceDate,
      clientName: req.body.clientName,
      clientContact: req.body.clientContact,
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
    });

    await newBilling.save();
    console.log('Billing saved successfully:', newBilling);
    res.status(201).json({ message: 'Billing submitted successfully!', invoiceNo: invoiceNumber });
  } catch (error) {
    console.error('Error adding billing:', error);
    console.error(error.stack);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



const getLastInvoiceNumber = async (req, res) => {
  try {
    const lastBilling = await Billing.findOne({}, {}, { sort: { 'invoiceNo': -1 } });
    // console.log(lastBilling);
    let lastInvoiceNumber = 1;
    if (lastBilling) {
      const lastInvoiceNo = lastBilling.invoiceNo;
      lastInvoiceNumber = parseInt(lastInvoiceNo.substring(3), 10) + 1;
      // console.log("lastInvoiceNumber", lastInvoiceNumber);
    }

    // Check if the invoiceNo already exists, and if so, keep incrementing
    let invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, '0')}`;
    // console.log(invoiceNo);
    while (await Billing.findOne({ invoiceNo })) {
      lastInvoiceNumber++;
      invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, '0')}`;
      // console.log(invoiceNo, "already taken");
    }

    res.status(200).json({ lastInvoiceNumber: invoiceNo }); // Send the full invoiceNo string
  } catch (error) {
    console.error("Error fetching last invoice number:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAll = async (req, res) => {
    try {
      const users = await Billing.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'An error occurred while fetching users. Please try again later.' });
    }
  }

  const getBills = async (req, res) => {
    try {
      const bills = await Billing.find({});
      res.status(200).json(bills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ message: 'An error occurred while fetching bills. Please try again later.' });
    }
  }

module.exports = {
    billsInvoice,
    getAll,
    getBills,
    getLastInvoiceNumber,
};

