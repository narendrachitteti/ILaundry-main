import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper/Helper.js";
import Navbar from "../components/Navbar.js";
import "./TodayOrders.css"; // Import CSS file for styling

const TodayOrdersPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(6);

  useEffect(() => {
    fetchTodayInvoices();
  }, []);

  const fetchTodayInvoices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get-bills`);
      // Get today's date
      const today = new Date();
      // Format today's date to match the invoice date format
      const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      console.log("Formatted Today:", formattedToday); // Log formatted today's date
      // Filter invoices for today's date
      const todayInvoices = response.data.filter(invoice => {
        return invoice.invoiceDate === formattedToday;
      });
      setInvoices(todayInvoices);
      setLoading(false); // Set loading to false after fetching invoices
    } catch (error) {
      console.error("Error fetching today's invoices:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Logic to get current invoices based on pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  // Generate array for page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Display only 5 page numbers at a time
  const displayPageNumbers = pageNumbers.slice(
    Math.max(0, Math.min(currentPage - 2, totalPages - 4)),
    Math.min(pageNumbers.length, Math.max(currentPage + 2, 4))
  );

  return (
    <div>
      <Navbar/>
      <div className="today-data">
        <h2>Todays Orders: {invoices.length}</h2>
       <table className="today-table">
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
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="today-pagination">
            {currentPage > 1 && (
              <button onClick={() => paginate(currentPage - 1)}>{'<'}</button>
            )}
            {displayPageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? "active" : null}
              >
                {pageNumber}
              </button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => paginate(currentPage + 1)}>{'>'}</button>
            )}
          </div>
        </div>
      
      </div>
  );
};

export default TodayOrdersPage;
