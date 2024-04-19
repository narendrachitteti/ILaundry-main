import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Select from "react-select";
import './Register.css';

function Register() {
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [storeId, setStoreId] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchStoreId();
  }, []);

  const fetchStoreId = async () => {
    try {
      const response = await fetch("http://localhost:5000/getNextStoreId");
      if (response.ok) {
        const data = await response.json();
        setStoreId(data.storeId);
      } else {
        setError("Failed to fetch store ID");
      }
    } catch (error) {
      console.error("Error fetching store ID:", error);
      setError(
        "An error occurred while fetching store ID. Please try again later."
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

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Validate phone number format as per your requirement
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!storeId) {
      // You can show a message or toast indicating that the storeId is being fetched
      setError("Fetching store ID...");
      return;
    }

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const email = formData.get("email");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const name = formData.get("name");

    if (!validateName(name)) {
      toast.error("First name should only contain letters");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password should contain at least 8 characters, one letter, one number, and one special character"
      );
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number");
      return;
    }

    const userData = {
      name: name,
      email: email,
      userType: userType,
      password: password,
      storeId: storeId,
      area: selectedArea.value, // This should send the selected area value
      phoneNumber: phoneNumber, // Include the phone number in userData
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("Registration successful");
        event.target.reset();
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Link to="/" className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ width: "25px", height: "25px" }}
          className="back-icon"
        />
      </Link>
      <div className="container-abed23s">
        <div className="Inner-container-abed23s">
          <h1>Registration</h1>
          <form className="formContainerabcd123" onSubmit={handleRegister}>
            <input
              name="storeId"
              type="text"
              value={storeId}
              readOnly
              placeholder="Store ID"
              required
              className="inputabcd123"
            />
            <Select
              value={selectedArea}
              onChange={setSelectedArea}
              options={options}
              placeholder="Select Area"
              className="selectabcd1233"
              required
            />

            <input
              name="name" // Changed from "firstName"
              type="text"
              placeholder=" Name"
              required
              className="inputabcd123"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="inputabcd123"
            />
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="inputabcd123"
            />
            <select
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="selectabcd123"
              required
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="inputabcd123"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              className="inputabcd123"
            />

            <button type="submit" className="buttonabcd123">
              Register
            </button>
          </form>
          <p className="already-registered">
            Already Registered..? &nbsp;&nbsp;
            <Link to="/Login">Login Here..</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
