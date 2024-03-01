
const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    unique: true,
  },
  // invoiceDate: {
  //   type: Date,
  //   default: Date.now,
  // },
  invoiceDate: String,
  clientName: String,
  clientContact: String,
  customeraddress: String,
  items: [{
    item: String,
    quantity: Number,
    services:String,
    price:Number,
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
  // Assuming invoiceDate is stored as a string in the format "yyyy-mm-ddTHH:mm:ss.SSSZ"
  const rawDate = new Date(this.invoiceDate);
  
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = rawDate.getFullYear();

  return `${day}-${month}-${year}`;
};
const billing = mongoose.model("bill", billingSchema);

module.exports = billing;
