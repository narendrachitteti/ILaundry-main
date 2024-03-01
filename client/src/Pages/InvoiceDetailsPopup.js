import React from 'react';

const InvoiceDetailsPopup = ({ selectedInvoice, onClose}) => {
  return (
    <div>
      <h2>Invoice Details</h2>
      {selectedInvoice && (
        <div>
          <p><strong>Invoice No:</strong> {selectedInvoice.invoiceNo}</p>
          <p><strong>Invoice Date:</strong> {selectedInvoice.invoiceDate}</p>
          <p><strong>Client Name:</strong> {selectedInvoice.clientName}</p>
          <p><strong>Client Contact:</strong> {selectedInvoice.clientContact}</p>
          <p><strong>Discount Rate:</strong> {selectedInvoice.discountRate}</p>
          <p><strong>Discount Amount:</strong> {selectedInvoice.discountAmount}</p>
          <p><strong>Tax Rate:</strong> {selectedInvoice.taxRate}</p>
          <p><strong>Tax Amount:</strong> {selectedInvoice.taxAmount}</p>
          <p><strong>Total:</strong> {selectedInvoice.total}</p>
          <p><strong>Subtotal:</strong> {selectedInvoice.subTotal}</p>
          <p><strong>Currency:</strong> {selectedInvoice.selectedCurrency}</p>
          {/* <p><strong>Items:</strong></p> */}
          
            {selectedInvoice.items.map((item, index) => (
              <p key={index}>
                <p><strong>Item Name:</strong> {item.item}</p>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Services:</strong> {item.services}</p>
              </p>
            ))}
          
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsPopup;
