import React, { useState } from "react";
import * as Components from "../Login/Components";
import "../Login/Login.css";
import { useNavigate } from "react-router";

function StaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the relevant page based on the response message
        if (data.message === "Staff login successful") {
          navigate("/PreviousBills");
        } else if (data.message === "Admin login successful") {
          setError("You are not authorized to access this page.");
        } else {
          setError("Invalid email or password");
        }
      } else if (response.status === 403) {
        setError("You are not authorized to access this page.");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="complete98">
      <button
        className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
        title="Go Back"
        style={{ marginLeft: "-90%", marginTop: "-5%" }}
        onClick={handleBackButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          className="stroke-white"
        >
          <path
            stroke="red"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          ></path>
        </svg>
      </button>

      <Components.Container>
        <Components.SignInContainer>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Staff Login</Components.Title>
            <Components.Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Components.Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Components.Button type="submit">Login</Components.Button>
            {error && <div className="error-message">{error}</div>}
          </Components.Form>
        </Components.SignInContainer>
      </Components.Container>
    </div>
  );
}

export default StaffLogin;
