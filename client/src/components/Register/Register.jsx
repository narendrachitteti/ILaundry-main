import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Register/Register.css";
import Navbar from "../Navbar";

function Register() {
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation (minimum 8 characters, at least one letter, one number, and one special character)
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");

    if (!validateName(firstName) || !validateName(lastName)) {
      toast.error("First name and last name should only contain letters");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password should contain at least 8 characters, one letter, one number, and one special character");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    const userData = {
      fullName: fullName,
      email: email,
      userType: userType,
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
        <FontAwesomeIcon icon={faArrowLeft} style={{ width: "25px", height: "25px" }} className="back-icon" />
      </Link>
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
