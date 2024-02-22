const Invoice = require('../models/invoiceModel');

const saveInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json({ message: 'Invoice saved successfully' });
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getInvoice= async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Fetch all invoices from the database
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  // Convert the 'items' string to an array of objects
  if (newData.items && Array.isArray(newData.items)) {
    newData.items.forEach(item => {
      if (item.quantity && typeof item.quantity === 'string') {
        item.quantity = parseFloat(item.quantity); // Convert quantity to a number
      }
    });
  }

  try {
    console.log('Updating invoice with ID:', id);
    console.log('New data:', newData);

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, newData, { new: true });
    console.log('Updated invoice:', updatedInvoice);

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { saveInvoice, getInvoice,updateInvoice  };
