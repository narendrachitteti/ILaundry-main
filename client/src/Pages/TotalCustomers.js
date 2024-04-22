import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper/Helper.js";
import "./TotalCustomers.css"; // Import CSS file for styling

const TotalCustomers = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get-bills`);
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <div className="invoices-data">
      <h2>Total Invoices: {invoices.length}</h2>
      <ul className="invoices-list">
        {invoices.map((invoice, index) => (
          <li key={invoice._id} className={`invoice-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <p>Invoice Number: {invoice.invoiceNo}</p>
            <p>Invoice Date: {invoice.invoiceDate}</p>
            <p>Client Name: {invoice.clientName}</p>
            <p>Client Contact: {invoice.clientContact}</p>
            <p>Subtotal: {invoice.subTotal}</p>
            <p>Discount Rate: {invoice.discountRate}</p>
            <p>Discount Amount: {invoice.discountAmount}</p>
            <p>Tax Rate: {invoice.taxRate}</p>
            <p>Tax Amount: {invoice.taxAmount}</p>
            <p>Total: {invoice.total}</p>
            <p>Selected Currency: {invoice.selectedCurrency}</p>
            <p>Selected Payment Mode: {invoice.selectedPaymentMode}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalCustomers;