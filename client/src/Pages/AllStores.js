import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "../Helper/Helper.js"; // Import BASE_URL from your Helper.js file
import './AllStores.css';
import Navbar from "../components/Navbar.js";




const AllStores = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Define fetchUserData function within the component
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/registerdetails`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Call fetchUserData when component mounts
  }, []);

  // useEffect(() => {
  //   fetchUserData(); // This seems redundant, you may remove it
  // }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
      <div className="all-stores-container">
        <h2 className="all-stores-title">All Stores</h2>
        <div className="search-container-allstore">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-allstore"
          />
          
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th className="store-id">StoreId</th>
              <th className="area">Area</th>
              <th className="name">Name</th>
              <th className="phone-number">Phone Number</th>
              <th className="email">Email</th>
              <th className="user-type">User Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.storeId}>
                <td>{user.storeId}</td>
                <td>{user.area}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllStores;
