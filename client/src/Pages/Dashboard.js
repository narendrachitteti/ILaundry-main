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

// Import the OrdersTable component
import OrdersTable from "./OrdersTable";

const Dashboard = () => {
  // State variables
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalShops: 0,
    totalOrders: 0,
    todayOrders: 0,
    completedOrders: 0,
    newOrders: 0,
    pickupOrders: 0,
    deliveredOrders: 0,
    urgentOrders: 0,
    location: "",
  });
  const [showLocations, setShowLocations] = useState(false);
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

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get-bills`);
      const data = response.data;

      setStats({
        totalCustomers: data.totalCustomers,
        totalShops: data.totalShops,
        totalStores: data.totalStores,
        todayOrders: data.todayOrders,
        completedOrders: data.completedOrders,
        newOrders: data.newOrders,
        pickupOrders: data.pickupOrders,
        deliveredOrders: data.deliveredOrders,
        location: data.location,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle location click
  const handleLocationClick = () => {
    setShowLocations((prev) => !prev);
  };

  // Handle card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="dashboard-main-container">
      {/* <Sidebar /> */}
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>

        {/* Cards container has been removed, along with the sales, revenue, and expenses cards */}
        
        <div className="stats-container">
          <div className="row">
            <div className="stat-card">
              <h3>
                <span className="stat-heading">
                  <FaPeopleGroup /> Total Customers
                </span>
              </h3>
              <p>{stats.totalCustomers}</p>
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
            {/* <div className="stat-card">
              <h3>
                <span className="stat-heading">
                  New Orders  <IoNewspaper />
                </span>
              </h3>
              <p>{stats.newOrders}</p>
            </div>
            <div className="stat-card">
              <h3>
                <span className="stat-heading">
                   Pickup Orders <IoNewspaper />
                </span>
              </h3>
              <p>{stats.pickupOrders}</p>
            </div>
            <div className="stat-card">
              <h3>
                <span className="stat-heading">
                  Delivered Orders <IoNewspaper />
                </span>
              </h3>
              <p>{stats.deliveredOrders}</p>
            </div> */}
            <div className="stat-card">
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
        {/* <OrdersTable /> */}
      </div>
    </div>
  );
};

export default Dashboard;
