import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const [error, setError] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");

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

  const validatemobileNumber = (mobileNumber) => {
    return /^\d{10}$/.test(mobileNumber);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const email = formData.get("email");
    const name = formData.get("name");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

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

    if (!validatemobileNumber(mobileNumber)) {
      toast.error("Invalid phone number");
      return;
    }

    const userData = {
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
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
      setError(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <>
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
              name="name"
              type="text"
              placeholder="Name"
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
              name="mobileNumber"
              type="text"
              placeholder="Phone Number"
              value={mobileNumber}
              onChange={(e) => setmobileNumber(e.target.value)}
              required
              className="inputabcd123"
            />
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
