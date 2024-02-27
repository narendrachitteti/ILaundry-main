import React, { useEffect, useState } from "react";
import * as Components from "./Components";
import "./Login.css";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = React.useState(true);

  useEffect(() => {
    localStorage.removeItem("mail");
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userData = {
      email: formData.get("email"),
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
        const enteredEmail = userData.email;
        // Store entered email in localStorage
        localStorage.setItem("mail", enteredEmail);
        // Redirect user to InvoiceForm or any desired location
        navigate("/Bills");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  // const navigate = useNavigate();
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffError, setStaffError] = useState("");

  const handleLogin1 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: staffEmail, password: staffPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the relevant page based on the response message
        if (data.message === "Staff login successful") {
          navigate("/Bills");
        } else {
          setStaffError("You are not authorized to access this page.");
        }
      } else if (response.status === 403) {
        setStaffError("You are not authorized to access this page.");
      } else {
        setStaffError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setStaffError(
        "An error occurred while logging in. Please try again later."
      );
    }
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
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <Components.Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              {/* <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor> */}
              <Components.Button type="submit">Login</Components.Button>
            </Components.Form>
          </Components.SignInContainer>
        ) : (
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleLogin1}>
              <Components.Title>Staff Login</Components.Title>
              <Components.Input
                name="email"
                type="email"
                placeholder="Email"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                required
              />
              <Components.Input
                name="password"
                type="password"
                placeholder="Password"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                required
              />
              <Components.Button type="submit">Login</Components.Button>
              {staffError && <div className="error-message">{staffError}</div>}
            </Components.Form>
          </Components.SignUpContainer>
        )}
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Master Login</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
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
  );
}

export default Login;
