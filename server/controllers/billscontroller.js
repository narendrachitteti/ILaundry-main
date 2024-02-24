// const bills = require("../models/billsModel");

// const billsInvoice = async (req, res) => {
//     try {
//         const newInvoice = new bills(req.body);
//         await newInvoice.save();
//         res.status(201).json({ message: 'Invoice saved successfully' });
//     } catch (error) {
//         console.error('Error saving invoice:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = {
//     billsInvoice,
// };

const Billing = require("../models/billsModel");

const billsInvoice = async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();
    res.status(201).json(newBilling);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save billing data" });
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

module.exports = {
    billsInvoice,
    getAll,
};

