import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image14 from "../assets/images/ilaundry.jpg";
import image15 from "../components/images/bills.jpg";
import image16 from "../components/images/profile.jpg";
import image17 from "../components/images/customer.jpg";
import register from "../components/images/register.png";
import { IoLogOutOutline } from "react-icons/io5";

import "../Styles/Navbar.css";
import axios from "axios";
import { BASE_URL } from "../Helper/Helper";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedStoreId = localStorage.getItem("storeId");
      if (storedStoreId) {
        try {
          const response = await axios.get(`${BASE_URL}/users/${storedStoreId}`);
          console.log("User data from backend:", response.data); // Log the response data
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user by storeId:", error);
        }
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to only call this effect once on component mount

  const logout = () => {
    localStorage.removeItem("storeId");
    setUser({}); // Clear user data
    navigate("/"); // Navigate to the login page
  };
  

  return (
    <div>
      <div className="button-container23">
        <Link to="/">
          <img
            src={image14}
            alt=""
            style={{ height: "3rem", width: "10rem", marginLeft: "-9%" }}
          />
        </Link>
        <Link to="/Dashboard">
          <div className="bills">
            <img src="https://cdn-icons-png.freepik.com/512/7664/7664156.png" alt="" style={{ height: "2.5rem" }} />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to="/orderstable">
          <div className="bills">
            <p>Recent Orders</p>
          </div>
        </Link>
        <Link to="/rating">
          <div className="bills">
            <p>Customer Reviews</p>
          </div>
        </Link>

        <Link to="/Userlist">
          <div className="bills">
            <p>Register Details</p>
          </div>
        </Link>

        
        
        <div className="bills">
          <img src={image16} alt="" style={{ height: "2.5rem" }} />
          <p>Profile</p>
          <div className="dropdown-content">
            <p>Name: {user?.name}</p>
            <p>Store ID: {user?.storeId}</p>
            <p
              onClick={logout}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              Logout <IoLogOutOutline />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
