import React, { useState, useEffect } from "react";

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
import { useNavigate } from "react-router-dom";
import AllStores from "./AllStores.js";
// Import the OrdersTable component
import OrdersTable from "./OrdersTable";

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


  const handleCardClick = (card) => {
    setSelectedCard(card);
    if (card === "totalStores") {
      // Navigate to AllStores page programmatically
      navigate("/AllStores");
    }
  };

  // Fetch total stores data function
  const fetchTotalStores = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/totalStores`);
      setStats((prevStats) => ({
        ...prevStats,
        totalStores: response.data.totalStores,
      }));
      // Fetch user data after fetching total stores data
    } catch (error) {
      console.error("Error fetching total stores:", error);
    }
  };

  useEffect(() => {
    // Fetch total stores data when component mounts
    fetchTotalStores();
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

  return (
    <div className="dashboard-main-container">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>
        <div className="stats-container">
          <div className="row">
          {/* <div className="stat-card" onClick={navigateToTotalCustomers}> */}
          <div className="stat-card" >
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
      </div>
    </div>
  );
};

export default Dashboard;