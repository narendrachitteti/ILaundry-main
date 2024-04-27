import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Select from "react-select";
import axios from "axios";
import './StaffRegister.css'; // Added CSS file

function StaffRegister() {
  const [error, setError] = useState("");
  const [staffId, setStaffId] = useState("");
  const [selectedArea, setSelectedArea] = useState(null); // Changed from 'area' to 'selectedArea'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchStaffId();
  }, []);

  const fetchStaffId = async () => {
    try {
      const response = await fetch("http://localhost:5000/getNextStaffId");
      if (response.ok) {
        const data = await response.json();
        setStaffId(data.staffId);
      } else {
        setError("Failed to fetch staff ID");
      }
    } catch (error) {
      console.error("Error fetching staff ID:", error);
      setError(
        "An error occurred while fetching staff ID. Please try again later."
      );
    }
  };

  const options = [
    {
      value: "Kumaraswamy Layout 1st Stage",
      label: "Kumaraswamy Layout 1st Stage",
    },
    { value: "Jp Nagar", label: "Jp Nagar" },
    { value: "Rajarajeshwari Nagar", label: "Rajarajeshwari Nagar" },
    { value: "Hanumantha Nagar", label: "Hanumantha Nagar" },
    { value: "Banaswadi", label: "Banaswadi" },
    { value: "Banashankari 3rd Stage", label: "Banashankari 3rd Stage" },
    { value: "Banashankari 2nd Stage", label: "Banashankari 2nd Stage" },
  ];

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Validate phone number format as per your requirement
    return /^\d{10}$/.test(phoneNumber);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await axios.post('http://localhost:5000/registerStaff', {
        staffId,
        staffArea: selectedArea ? selectedArea.value : "", // Using selectedArea instead of area
        phoneNumber,
        password,
      });
      
      if (response.status === 201) {
        // Registration successful
        toast.success('Staff registered successfully');
        // Get the next staff ID without refreshing the page
        fetchStaffId();
        // Reset form fields
        setSelectedArea(null); // Reset selected area
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      }
    } catch (error) {
      console.error('Error registering staff:', error);
      toast.error('An error occurred while registering staff. Please try again later.');
    }
  };
  


  return (
    <>
      <Link to="/Dashboard" className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ width: "25px", height: "25px" }}
          className="back-icon"
        />
      </Link>
      <div className="container-StaffRegister">
        <div className="Inner-container-StaffRegister">
          <h1>Staff Registration</h1>
          <form className="formContainer-StaffRegister" onSubmit={handleRegister}>
            <input
              name="staffId"
              type="text"
              value={staffId}
              readOnly
              placeholder="Staff ID"
              required
              className="input-StaffRegister"
            />
            <Select
              value={selectedArea}
              onChange={setSelectedArea}
              options={options}
              placeholder="Select Area"
              className="select-StaffRegister"
              required
            />
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input-StaffRegister"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-StaffRegister"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-StaffRegister"
            />
            <button type="submit" className="button-StaffRegister">
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default StaffRegister;
