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
      const response = await axios.get(`${BASE_URL}/api/dashboard`);
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
      <Sidebar />
      {/* <Navbar /> */}
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>

        <div className="cards-container">
          {/* Sales Card */}
          <div
            className="card-container sales-card"
            onClick={() => handleCardClick("sales")}
          >
            <div className="icon">&#36;</div> {/* Dollar sign icon for sales */}
            <div
              className="progress-circle"
              style={{
                "--percentage": `${stats.salesPercentage}%`, // Assuming you have a salesPercentage variable in stats
              }}
            >
              <div className="progress-inner">{stats.salesPercentage}%</div>
            </div>
            <div className="card-amount">${stats.salesAmount}</div>
            <div className="card-title">Sales</div>
            <div className="card-label">Last 24 hours</div>
            {/* Display sales amount */}
          </div>

          {/* Revenue Card */}
          <div
            className="card-container revenue-card"
            onClick={() => handleCardClick("revenue")}
          >
            <div className="icon">&#128176;</div>{" "}
            {/* Money bag icon for revenue */}
            <div
              className="progress-circle"
              style={{
                "--percentage": `${stats.revenuePercentage}%`, // Assuming you have a revenuePercentage variable in stats
              }}
            >
              <div className="progress-inner">{stats.revenuePercentage}%</div>
            </div>
            <div className="card-amount">${stats.revenueAmount}</div>
            <div className="card-title">Revenue</div>
            <div className="card-label">Last 24 hours</div>
          </div>

          <div
            className="card-container expenses-card"
            onClick={() => handleCardClick("expenses")}
          >
            <div className="icon">&#128178;</div>
            <div
              className="progress-circle"
              style={{
                "--percentage": `${stats.expensesPercentage}%`,
              }}
            >
              <div className="progress-inner">{stats.expensesPercentage}%</div>
            </div>
            <div className="card-amount">${stats.expensesAmount}</div>
            <div className="card-title">Expenses</div>
            <div className="card-label">Last 24 hours</div>
          </div>
        </div>

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
            <div className="stat-card">
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
            </div>
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
