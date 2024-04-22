// const Billing = require("../models/billsModel");

// const billsInvoice = async (req, res) => {
//   try {
//     const count = await Billing.countDocuments();
//     const invoiceNumber = `INV${(count + 1).toString().padStart(5, '0')}`;

//     const invoiceDate = new Date(req.body.invoiceDate);
//     const deliveryDate = req.body.deliveryDate; // New delivery date

//     const newBilling = new Billing({ 
//       user: {
//         userId: req.body.user.userId,
//         fullName: req.body.user.fullName,
//       },
//       username: req.body.username,
//       invoiceNo: invoiceNumber,
//       invoiceDate: req.body.invoiceDate,
//       deliveryDate: deliveryDate, // Assign delivery date
//       pickupdate: req.body.pickupdate, // Assign pickup date
//       store: req.body.store,
//       factory: req.body.factory,
//       clientName: req.body.clientName,
//       clientContact: req.body.clientContact,
//       customeraddress: req.body.customeraddress,
//       items: req.body.items,
//       subTotal: req.body.subTotal,
//       discountRate: req.body.discountRate,
//       discountAmount: req.body.discountAmount,
//       taxRate: req.body.taxRate,
//       taxAmount: req.body.taxAmount,
//       total: req.body.total,
//       selectedCurrency: req.body.selectedCurrency,
//       selectedPaymentMode: req.body.selectedPaymentMode,
//     });

//     await newBilling.save();
//     console.log('Billing saved successfully:', newBilling);
//     res.status(201).json({ message: 'Billing submitted successfully!', invoiceNo: invoiceNumber });
//   } catch (error) {
//     console.error('Error adding billing:', error);
//     console.error(error.stack);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };



// const getLastInvoiceNumber = async (req, res) => {
//   try {
//     const lastBilling = await Billing.findOne({}, {}, { sort: { 'invoiceNo': -1 } });
//     // console.log(lastBilling);
//     let lastInvoiceNumber = 1;
//     if (lastBilling) {
//       const lastInvoiceNo = lastBilling.invoiceNo;
//       lastInvoiceNumber = parseInt(lastInvoiceNo.substring(3), 10) + 1;
//       // console.log("lastInvoiceNumber", lastInvoiceNumber);
//     }

//     // Check if the invoiceNo already exists, and if so, keep incrementing
//     let invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, '0')}`;
//     // console.log(invoiceNo);
//     while (await Billing.findOne({ invoiceNo })) {
//       lastInvoiceNumber++;
//       invoiceNo = `INV${lastInvoiceNumber.toString().padStart(5, '0')}`;
//       // console.log(invoiceNo, "already taken");
//     }

//     res.status(200).json({ lastInvoiceNumber: invoiceNo }); // Send the full invoiceNo string
//   } catch (error) {
//     console.error("Error fetching last invoice number:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// const getAll = async (req, res) => {
//     try {
//       const users = await Billing.find({});
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ message: 'An error occurred while fetching users. Please try again later.' });
//     }
//   }

 
// const getAllBills = async (req, res) => {
//   try {
//     const fromDate = new Date(req.body.fromDate);
//     const toDate = new Date(req.body.toDate);
    
//     // Fetch all bills from the database
//     const allBills = await Billing.find({});
    
//     // Filter bills based on the selected date range
//     const filteredBills = allBills.filter(bill => {
//       const billDate = new Date(bill.invoiceDate);
//       return billDate >= fromDate && billDate <= toDate;
//     });
    
//     res.status(200).json(filteredBills);
//   } catch (error) {
//     console.error('Error fetching bills:', error);
//     res.status(500).json({ message: 'An error occurred while fetching bills. Please try again later.' });
//   }
// };

// const updateBilling = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedBilling = await Billing.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedBilling) {
//       return res.status(404).json({ message: "Billing record not found" });
//     }
//     res.status(200).json({ message: "Billing record updated successfully", billing: updatedBilling });
//   } catch (error) {
//     console.error("Error updating billing record:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const deleteBilling = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedBilling = await Billing.findByIdAndDelete(id);
//     if (!deletedBilling) {
//       return res.status(404).json({ message: "Billing record not found" });
//     }
//     res.status(200).json({ message: "Billing record deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting billing record:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };



// module.exports = {
//     billsInvoice,
//     getAll,
//     deleteBilling,
//     updateBilling,
//     getAllBills,
//     getLastInvoiceNumber,
// };



const Billing = require("../models/billsModel");

// Create or update a billing record
const createOrUpdateBilling = async (req, res) => {
  const { id } = req.params;

  try {
    let invoiceNumber = req.body.invoiceNo;

    if (!invoiceNumber) {
      // Generate a new invoice number if not provided
      const lastBilling = await Billing.findOne({}, {}, { sort: { invoiceNo: -1 } });
      let lastInvoiceNumber = 1;

      if (lastBilling) {
        const lastInvoiceNo = lastBilling.invoiceNo;
        lastInvoiceNumber = parseInt(lastInvoiceNo.substring(3), 10) + 1;
      }

      invoiceNumber = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;

      // Ensure the generated invoiceNo is unique
      while (await Billing.findOne({ invoiceNo: invoiceNumber })) {
        lastInvoiceNumber++;
        invoiceNumber = `INV${lastInvoiceNumber.toString().padStart(5, "0")}`;
      }
    }
    const newBilling = {
      user: {
        userId: req.body.user.userId,
        fullName: req.body.user.fullName,
      },
      username: req.body.username,
      invoiceNo: id ? req.body.invoiceNo : invoiceNumber, // Use existing or generate new invoice number
      invoiceDate: req.body.invoiceDate,
      deliveryDate: req.body.deliveryDate,
      pickupdate: req.body.pickupdate,
      store: req.body.store,
      factory: req.body.factory,
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
    };

    if (id) {
      // Update existing billing record
      await Billing.findByIdAndUpdate(id, newBilling);
      res.status(200).json({ message: "Billing updated successfully" });
    } else {
      // Create new billing record
      const createdBilling = new Billing(newBilling);
      await createdBilling.save();
      res.status(201).json({ message: "Billing created successfully", invoiceNo: newBilling.invoiceNo });
    }
  } catch (error) {
    console.error("Error creating or updating billing record:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

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

