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


const Dashboard = () => {
  const [totalStores, setTotalStores] = useState(0);
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
  const [totalCustomers, setTotalCustomers] = useState(0); // Define totalCustomers state variable

  const navigate = useNavigate();


  useEffect(() => {
    const fetchTotalStores = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/totalStores`);
        setTotalStores(response.data.totalStores);
      } catch (error) {
        console.error("Error fetching total stores:", error);
      }
    };

    fetchTotalStores();
  }, []);

 


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

  const handleCardClick = (cardType) => {
    if (cardType === "totalStores") {
      navigate("/AllStores");
    }
  };


  const handleLocationClick = () => {
    setShowLocations((prev) => !prev);
  };



  const navigateToTotalCustomers = () => {
    navigate("/TotalCustomer");
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
                <span className="stat-heading">
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
              <p>{totalStores}</p>
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
