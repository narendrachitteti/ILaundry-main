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
  items: [{
    item: String,
    quantity: Number,
    // subtotal: Number,
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

// Pre-save middleware to generate invoice number
// billingSchema.pre("save", async function (next) {
//     if (!this.invoiceNo) {
//         const latestInvoice = await this.constructor.findOne({}, {}, { sort: { 'invoiceNo': -1 } });
//         let newInvoiceNo = "INV0001";
//         if (latestInvoice) {
//             const latestInvoiceNo = latestInvoice.invoiceNo;
//             const lastNumber = parseInt(latestInvoiceNo.substring(3));
//             newInvoiceNo = `INV${("000" + (lastNumber + 1)).slice(-4)}`;
//         }
//         this.invoiceNo = newInvoiceNo;
//     }
//     next();
// });

const billing = mongoose.model("bill", billingSchema);

module.exports = billing;
