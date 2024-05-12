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
  // State variables
  const [totalStores, setTotalStores] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [invoices, setInvoices] = useState([]); // Define invoices state
  const [todayOrders, setTodayOrders] = useState(0); // Define todayOrders state

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

  useEffect(() => {
    const fetchTodayInvoices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/get-bills`);
        
        const today = new Date();
        const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        const todayInvoices = response.data.filter(invoice => invoice.invoiceDate === formattedToday);
        
        setInvoices(todayInvoices);
        setTodayOrders(todayInvoices.length);
      } catch (error) {
        console.error("Error fetching today's invoices:", error);
      }
    };
  
    fetchTodayInvoices();
  }, []);
  
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (cardType) => {
    if (cardType === "totalStores") {
      navigate("/AllStores");
    }
  };

  const navigateToTotalCustomers = () => {
    navigate("/TotalCustomers")
  };

  const handleTodayOrdersClick = async () => { // Fetch today's orders
    navigate("/TodayOrders"); // Navigate to the "Today Orders" page
  };

  return (
    <div>
      <Navbar/>
    <div className="dashboard-main-container">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashcol">Master Dashboard</h2>
        <div className="stats-container">
          <div className="row">
            <div className="total-customers" onClick={navigateToTotalCustomers}>
              <h3>
                <div className="custom1">
                  <div className="icons">
                    <FaPeopleGroup />
                  </div>
                  <div>Total Customers</div>
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
                  <div>Completed Orders</div>
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
                  <div>Total Orders</div>
                </div>
              </h3>
              <p>{stats.totalOrders}</p>
            </div>
            <div className="today-orders">
              <h3>
                <div className="custom1">
                  <div className="icons" >
                    <IoNewspaper />
                  </div>
                  <div onClick={handleTodayOrdersClick}> Today Orders </div>
                </div>
              </h3>
              <p>{todayOrders}</p>
            </div>
            <div className="total-stores" onClick={() => handleCardClick("totalStores")}>
              <h3>
                <div className="custom1">
                  <div className="icons">
                    <MdGroups />
                  </div>
                  <div>Total Stores</div>
                </div>
              </h3>
              <p>{totalStores}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
