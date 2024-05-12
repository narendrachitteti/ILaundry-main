const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  user: {
    userId: String,
    name: String,
  },
  username: String,
  invoiceNo: {
    type: String,
    unique: true,
  },
  clientName: String,
  invoiceDate: String,
  pickupdate: String,
  deliveryDate: String,
  clientContact: String,
  customeraddress: String,
  items: [
    {
      item: String,
      quantity: Number,
      services: String,
      price: Number,
    },
  ],
  subTotal: Number,
  discountRate: Number,
  discountAmount: Number,
  taxRate: Number,
  taxAmount: Number,
  total: Number,
  selectedCurrency: String,
  selectedPaymentMode: String,
  // activeButtonState: {
  //   type: Boolean,
  //   default: false,
  // },
  // buttonNumber: {
  //   type: Number,
  //   default: 0,
  // },
  // Add fields for Store (In/Out) and Factory (In/Out) statuses
  storeStatus: {
    type: String,
    enum: ['SIn', 'SOut'], // Valid values for store status
    default: 'SOut',
  },
  factoryStatus: {
    type: String,
    enum: ['FIn', 'FOut'], // Valid values for factory status
    default: 'FOut',
  },
});

billingSchema.methods.getFormattedInvoiceDate = function () {
  const rawDate = new Date(this.invoiceDate);
  const day = rawDate.getDate().toString().padStart(2, "0");
  const month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
  const year = rawDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const Billing = mongoose.model("Billing", billingSchema);
module.exports = Billing;