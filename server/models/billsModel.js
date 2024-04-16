const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  user: {
    userId: String,
    fullName: String,
  },
  username: String,
  invoiceNo: {
    type: String,
    unique: true,
  },
  invoiceDate: String,
  pickupdate: String, // New field for pickup date
  deliveryDate: String, // New field for delivery date
  store: String,
  factory: String,
  clientName: String,
  clientContact: String,
  customeraddress: String,
  items: [{
    item: String,
    quantity: Number,
    services: String,
    price: Number,
  }],
  subTotal: Number,
  discountRate: Number,
  discountAmount: Number,
  taxRate: Number,
  taxAmount: Number,
  total: Number,
  selectedCurrency: String,
  selectedPaymentMode: String,
});

billingSchema.methods.getFormattedInvoiceDate = function () {
  const rawDate = new Date(this.invoiceDate);
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
