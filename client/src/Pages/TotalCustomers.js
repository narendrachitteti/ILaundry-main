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
      <table className="invoices-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Client Name</th>
            <th>Client Contact</th>
            <th>Subtotal</th>
            <th>Discount Rate</th>
            <th>Discount Amount</th>
            <th>Tax Rate</th>
            <th>Tax Amount</th>
            <th>Total</th>
            <th>Selected Currency</th>
            <th>Selected Payment Mode</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice._id} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{invoice.invoiceNo}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.clientName}</td>
              <td>{invoice.clientContact}</td>
              <td>{invoice.subTotal}</td>
              <td>{invoice.discountRate}</td>
              <td>{invoice.discountAmount}</td>
              <td>{invoice.taxRate}</td>
              <td>{invoice.taxAmount}</td>
              <td>{invoice.total}</td>
              <td>{invoice.selectedCurrency}</td>
              <td>{invoice.selectedPaymentMode}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalCustomers;
