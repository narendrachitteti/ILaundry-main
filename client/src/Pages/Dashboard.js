import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { BASE_URL } from "../Helper/Helper.js";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
import Navbar from "../components/Navbar";

const POPUP_CLASSNAME = "dashboard-popup";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStores: 0,
    // Other stats...
  });

  const [showLocations, setShowLocations] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [locations] = useState([
    "RR Nagar",
    "Marathahalli",
    "Basavanagudi",
    "Jayanagar",
    "Koramangala",
    "BTM Layout",
    "Malleshwaram",
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/registerdetails`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/get-bills`);
        const totalCustomers = response.data.length; // Assuming the response is an array of customer data
        setTotalCustomers(totalCustomers);
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    fetchTotalCustomers();
  }, []);

  const handleLocationClick = () => {
    setShowLocations((prev) => !prev);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    if (card === "totalStores") {
      setShowPopup(true);
    }
  };

  const navigateToTotalCustomers = () => {
    navigate("/TotalCustomer");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="dashboard-main-container">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>
        <div className="stats-container">
          <div className="row">
          <div className="stat-card" onClick={navigateToTotalCustomers}>
              <h3>
                <span className="stat-heading">
                  <FaPeopleGroup /> Total Customers
                </span>
              </h3>
            <p>{totalCustomers}</p>
          </div>
            <div className="stat-card">
              <h3>
                <span className="stat-heading">
                  <IoNewspaper /> Completed Orders
                </span>
              </h3>
              <p>{stats.completedOrders}</p>
            </div>

            <div className="stat-card">
              <h3>
                <span className="stat-heading">
                  <BsFileEarmarkSpreadsheet /> Total Orders
                </span>
              </h3>
              <p>{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>
                <span class="stat-heading">
                  <IoNewspaper /> Today Orders
                </span>
              </h3>
              <p>{stats.todayOrders}</p>
            </div>
          </div>

          <div className="row">
            <div
              className="stat-card"
              onClick={() => handleCardClick("totalStores")}
            >
              <h3>
                <span className="stat-heading">
                  Total Stores <MdGroups />
                </span>
              </h3>
              <p>{stats.totalStores}</p>
            </div>
          </div>
          <div className="stat-card location-card">
            <h3 onClick={handleLocationClick} style={{ cursor: "pointer" }}>
              <span className="stat-heading">
                Location <FaSearchLocation />
              </span>
            </h3>
            <p>{stats.location}</p>
            {showLocations && (
              <div className="locations-dropdown">
                {locations.map((location, index) => (
                  <div key={index} className="location-item">
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Popup */}
        {showPopup && (
          <div className={`${POPUP_CLASSNAME} popup`}>
            <div className={`${POPUP_CLASSNAME}-inner popup-inner`}>
              {/* Close icon */}
              <div
                className={`${POPUP_CLASSNAME}-close`}
                onClick={handleClosePopup}
              >
                <svg
                  className={`${POPUP_CLASSNAME}-close-icon`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h2 className="dashboard-h2-heading">All Stores</h2>

              {/* Search text field and icon */}
              <div className={`${POPUP_CLASSNAME}-search`}>
                <input type="text" placeholder="Search..." />
                <svg
                  className={`${POPUP_CLASSNAME}-search-icon`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              {/* Table */}
              <table className={`${POPUP_CLASSNAME}-table`}>
                <thead>
                  <tr>
                    <th>StoreId</th>
                    <th>Area</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over data and populate table rows */}
                  {users.map((user) => (
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
          </div>
        )}
        {/* <OrdersTable /> */}
      </div>
    </div>
  );
};

export default Dashboard;
