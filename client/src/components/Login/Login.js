import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Components from "./Components";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [staffError, setStaffError] = useState("");
  const [area, setArea] = useState("");
  const [storeId, setStoreId] = useState(""); // Declare storeId state

  const fetchArea = async () => { // Remove storeId parameter from fetchArea function
    try {
      const response = await fetch(`http://localhost:5000/area/${storeId}`);
      if (response.ok) {
        const data = await response.json();
        setArea(data.area);
      } else {
        setArea(""); // Reset area if not found
      }
    } catch (error) {
      console.error("Error fetching area:", error);
      setArea(""); // Reset area on error
    }
  };

  useEffect(() => {
    // Fetch area when store ID changes
    fetchArea();
  }, [storeId]); // Update useEffect dependency

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const userData = {
      storeId: formData.get("storeId"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful login
        toast.success("Master login successful");
        setTimeout(() => {
          navigate("/Bills");
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid storeId or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  const handleLogin1 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const userData = {
      storeId: formData.get("storeId"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:5000/login/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful login
        toast.success("Staff login successful");
        setTimeout(() => {
          navigate("/Bills");
        }, 1500);
      } else if (response.status === 403) {
        setStaffError("You are not authorized to access this page.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid storeId or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <ToastContainer />
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

        <Components.Container
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          {signIn ? (
            <Components.SignInContainer signingIn={signIn}>
              <Components.Form onSubmit={handleLogin}>
                <Components.Title>Master Login</Components.Title>
                <Components.Input
                  name="storeId"
                  type="text"
                  placeholder="Store ID"
                  required
                  onChange={(e) => setStoreId(e.target.value)} // Update storeId state
                />
                 <Components.Input
                  type="text"
                  name="area"
                  value={area}
                  readOnly
                  placeholder="Area"
                />
                <Components.Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <Components.Button type="submit">Login</Components.Button>
                <div
                  style={{
                    display: "flex",
                    height: "25px",
                    borderRadius: "6px",
                    width: "100%",
                    padding: "3px",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ color: "black" }}>Don't have an account?</p>{" "}
                  &nbsp;&nbsp;
                  <Link to="/Register" style={{ textDecoration: "none" }}>
                    <div>
                      <p
                        style={{
                          color: "orange",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        Register
                      </p>
                    </div>
                  </Link>
                </div>
              </Components.Form>
            </Components.SignInContainer>
          ) : (
            <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleLogin1}>
              <Components.Title>Staff Login</Components.Title>
              <Components.Input
                name="storeId"
                type="text"
                placeholder="Store ID"
                required
                onChange={(e) => setStoreId(e.target.value)} // Update storeId state
              />
              <Components.Input
                type="text"
                name="area"
                value={area}
                readOnly
                placeholder="Area"
              />
          
              <Components.Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Components.Button type="submit">Login</Components.Button>
              <div
                style={{
                  display: "flex",
                  height: "25px",
                  borderRadius: "6px",
                  width: "100%",
                  padding: "3px",
                  marginTop: "10px",
                }}
              >
                <p style={{ color: "black" }}>Don't have an account?</p>{" "}
                &nbsp;&nbsp;
                <Link to="/Register" style={{ textDecoration: "none" }}>
                  <div>
                    <p
                      style={{
                        color: "orange",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      Register
                    </p>
                  </div>
                </Link>
              </div>
          
              {staffError && (
                <div className="error-message">{staffError}</div>
              )}
            </Components.Form>
          </Components.SignUpContainer>
          
          )}

          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>Master Login</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal
                  info.slide left to Master Login
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(true)}>
                  slide right
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Staff Login</Components.Title>
                <Components.Paragraph>
                  Enter your personal details and start journey with us. slide
                  left to staff Login
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(false)}>
                  slide left
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </div>
  );
}

export default Login;
