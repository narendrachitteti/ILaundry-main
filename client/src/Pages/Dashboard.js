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
    totalShops: 0,
    totalOrders: 0,
    todayOrders: 0,
    completedOrders: 0,
    // Other stats...
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
  const [totalCustomers, setTotalCustomers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalStores = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/totalStores`);
        setTotalStores(response.data.totalStores);
      } catch (error) {
        console.error("Error fetching total stores:", error);
        // Optionally, you can set totalStores to a default value or show an error message to the user
      }
    };

    fetchTotalStores();
  }, []);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/get-bills`);
        setTotalCustomers(response.data.length);
      } catch (error) {
        console.error("Error fetching total customers:", error);
        // Optionally, you can set totalCustomers to a default value or show an error message to the user
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
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="dashboard-main-container">
      {/* <Sidebar /> */}
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>

        <div className="stats-container">
          <div className="row">
            <div className="total-customers" onClick={navigateToTotalCustomers}>
              <h3>
                <div className="custom1" onc>
                  <div className="icons">
                    <FaPeopleGroup />
                  </div>
                  <div> Total Customers </div>
                </div>
              </h3>
              <p>{totalCustomers}</p>
            </div>
            <div className="complete-order">
              <h3>
                <div className="custom1">
                  <div className="icons">
                    <IoNewspaper />
                  </div>
                  <div> Completed Orders </div>
                </div>
              </h3>
              <p>{stats.completedOrders}</p>
            </div>
            <div className="total-orders">
              <h3>
                <div className="custom1">
                  <div className="icons">
                    <BsFileEarmarkSpreadsheet />
                  </div>
                  <div> Total Orders </div>
                </div>
              </h3>
              <p>{stats.totalOrders}</p>
            </div>
            <div className="today-orders">
              <h3>
                <div className="custom1">
                  <div className="icons">
                    <IoNewspaper />
                  </div>
                  <div> Today Orders </div>
                </div>
              </h3>
              <p>{stats.todayOrders}</p>
            </div>
            <div className="today-orders">
            <div
              // className="stat-card"
              onClick={() => handleCardClick("totalStores")}
            >
              <h3>
               <div className="custom1">
                  <div className="icons">
                    <IoNewspaper />
                  </div>
                  <div> Total Stores </div>
                </div>
              </h3>
              <p>{totalStores}</p>
            </div>
          </div>

          </div>
        </div>
      </div>
      {/* <OrdersTable /> */}
    </div>
  );
};

export default Dashboard;
