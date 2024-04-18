import React from "react";
import "./OrdersTable.css";
import Sidebar from "./Sidebar";

function createData(product, trackingId, date, status) {
  return { product, trackingId, date, status, details: "Details" };
}

const rows = [
  createData("Venu Gopal", "123456", "15 April 2024", "Approved"),
  createData("Deepak Rao", "789012", "16 April 2024", "Pending"),
  createData("Gopi ", "345678", "17 April 2024", "Delivered"),
  createData("Bharath", "112233", "18 April 2024", "Rejected"), 
];


const OrdersTable = () => {
  return (
    <div className="dashboard-main-container">
    <div className="orders-table-container">
      <Sidebar />
      {/* Wrap the table in a container for styling */}
      <h3 className="orders-table-heading">Recent Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Tracking ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={`status-${row.status.toLowerCase()}`}>
              <td>{row.product}</td>
              <td>{row.trackingId}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>
              <td>{row.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default OrdersTable;
