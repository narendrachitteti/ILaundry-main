import React, { useEffect, useState } from "react";
import * as Components from "./Components";
import "./Login.css";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [signIn, setSignIn] = React.useState(true);

 useEffect(()=>{
  localStorage.removeItem("mail")
 })

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
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
        // navigate("/SignInContainer");
        alert("Registration successful");
        setSignIn(true);
      } else {
        const errorData = await response.json();
        if (errorData.message.includes("already exists")) {
          alert("You already have an account. Please login instead.");
        } else {
          alert(errorData.message);
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

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
        navigate("/InvoiceForm");
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
              <Components.Title>Login</Components.Title>
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
            <Components.Form onSubmit={handleRegister}>
              <Components.Title>Register</Components.Title>
              <Components.Input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
              />
              <Components.Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
              />
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
              <Components.Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <Components.Button type="submit">Submit</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
        )}
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Login</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Login
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Register
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
