import React, { useState } from "react";
import "../Register/Register.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(""); // State to handle userType

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      userType: userType, // Include userType in userData
      password: password,
      confirmPassword: confirmPassword,
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
        alert("Registration successful");
        // Clear form fields after successful registration
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
      <Navbar />
      <div className="container-abed23s">
        <div className="Inner-container-abed23s">
          <h1>Registration</h1>
          <form className="formContainerabcd123" onSubmit={handleRegister}>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              className="inputabcd123"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="inputabcd123"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="inputabcd123"
              required
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
            {error && <div className="error-message">{error}</div>}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="inputabcd123"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="inputabcd123"
              required
            />
            {/* Select tag for userType */}

            <button type="submit" className="buttonabcd123">
              Register
            </button>
            {/* <p className="already-registered">
              Already Registered..? &nbsp;&nbsp;
              <Link to="/Login">Login Here..</Link>
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
