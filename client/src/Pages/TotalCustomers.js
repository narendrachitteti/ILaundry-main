import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/get-bills`); // Assuming your backend API endpoint for fetching customers is /api/customers
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div>
      <h2>All Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>{customer.fullName}</li>
          // Adjust this according to your customer data structure
        ))}
      </ul>
    </div>
  );
};

export default TotalCustomers;
