import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Components from "./Components";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [staffError, setStaffError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStaffType, setSelectedStaffType] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let url = "";
      const userData = { mobileNumber, password };
      if (selectedRole === "Admin") {
        url = "http://localhost:5000/api/login-admin";
      } else if (selectedRole === "SuperAdmin") {
        url = "http://localhost:5000/login-superadmin";
      } else {
        
        return;
      }
      
      const response = await axios.post(url, userData);

      if (response.status === 200) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard after successful login
        }, 1500);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response.data.message ||
          "An error occurred while logging in. Please try again later."
      );
    }
  };

  const handleLoginStaff = async (event) => {
    event.preventDefault();
    try {
      const userData = { mobileNumber, password, staffType: selectedStaffType };
      console.log("Attempting staff login with data:", userData);
      const response = await axios.post(
        "http://localhost:5000/api/staff/login",
        userData
      );

      if (response.status === 200) {
        toast.success("Staff login successful");
        localStorage.setItem("staffId", mobileNumber);
        setTimeout(() => {
          navigate("/Bills");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(
          "Staff not found. Please check your mobile number and try again."
        );
      } else {
        console.error("Error logging in as staff:", error);
        toast.error(
          error.response.data.message ||
            "An error occurred while logging in. Please try again later."
        );
      }
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowDropdown(false);
  };

  const handleStaffTypeSelect = (staffType) => {
    setSelectedStaffType(staffType);
    setShowDropdown(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="complete98">
        <button
          className="cursor-pointer-back-login duration-200 hover:scale-125 active:scale-100"
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
                <div className="dropdown-container-master-login">
                  <div
                    className="dropdown-button-master-login"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {selectedRole || "Select Role"}
                  </div>
                  {showDropdown && (
                    <div className="dropdown-options-master-login">
                      <div onClick={() => handleRoleSelect("Admin")}>Admin</div>
                      <div onClick={() => handleRoleSelect("SuperAdmin")}>
                        Super-Admin
                      </div>
                    </div>
                  )}
                </div>

                {selectedRole && (
                  <React.Fragment>
                    <Components.Input
                      name="mobileNumber"
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                      className="login-input-master-staff"
                    />
                    <Components.Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="login-input-master-staff"
                    />
                  </React.Fragment>
                )}

                <Components.Button type="submit">Login</Components.Button>

                <div
                  style={{
                    display: "flex",
                    height: "40px",
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
                        className="rigister-link-login"
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
              <Components.Form onSubmit={handleLoginStaff}>
                <Components.Title className="title-master-login">
                  Staff Login
                </Components.Title>
                <div className="dropdown-container-master-login">
                  <div
                    className="dropdown-button-master-login"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {selectedStaffType || "Select Staff Type"}
                  </div>
                  {showDropdown && (
                    <div className="dropdown-options-master-login">
                      <div onClick={() => handleStaffTypeSelect("StoreStaff")}>
                        Store Staff
                      </div>
                      <div
                        onClick={() => handleStaffTypeSelect("FactoryStaff")}
                      >
                        Factory Staff
                      </div>
                    </div>
                  )}
                </div>
                <Components.Input
                  name="mobileNumber"
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
                <Components.Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input-master-staff"
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
                ></div>

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
