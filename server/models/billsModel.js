// const mongoose = require("mongoose");

// const billingSchema = new mongoose.Schema({
//   invoiceNo: String,
//   invoiceDate: Date,
//   clientName: String,
//   clientContact: String,
//   rows: [{
//     item: String,
//     quantity: Number,
//     subtotal: Number
//   }],
//   subTotal: Number,
//   discountRate: Number,
//   discountAmount: Number,
//   taxRate: Number,
//   taxAmount: Number,
//   total: Number,
//   selectedCurrency: String
// });

// const billing = mongoose.model("bill", billingSchema);

// module.exports = billing;

// const mongoose = require("mongoose");

// const billingSchema = new mongoose.Schema({
//   invoiceNo: {
//     type: String,
//     unique: true,
//   },
//   invoiceDate: {
//     type: Date,
//     default: Date.now,
//   },
//   clientName: String,
//   clientContact: String,
//   customeraddress: String,
//   items: [{
//     item: String,
//     quantity: Number,
//     services:[String],
//     price:Number,
//   }],
//   subTotal: Number,
//   discountRate: Number,
//   discountAmount: Number,
//   taxRate: Number,
//   taxAmount: Number,
//   total: Number,
//   selectedCurrency: String,
//   selectedPaymentMode: String,
// });

// const billing = mongoose.model("bill", billingSchema);

// module.exports = billing;
// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({
//   item: String,
//   quantity: Number,
//   services: [String],
//   price: Number,
// });

// const billingSchema = new mongoose.Schema({
//   invoiceNo: {
//     type: String,
//     unique: true,
//   },
//   invoiceDate: {
//     type: Date,
//     default: Date.now,
//   },
//   clientName: String,
//   clientContact: String,
//   customeraddress: String,
//   items: [itemSchema],
//   subTotal: Number,
//   discountRate: Number,
//   discountAmount: Number,
//   taxRate: Number,
//   taxAmount: Number,
//   total: Number,
//   selectedCurrency: String,
//   selectedPaymentMode: String,
// });

// const billing = mongoose.model("bill", billingSchema);

// module.exports = billing;

const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    unique: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
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

const billing = mongoose.model("bill", billingSchema);

module.exports = billing;
