// import React, { useState } from "react";
// import "../Register/Register.css";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar";

// function Register() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     userType: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.firstName.trim()) {
//       errors.firstName = "First Name is required";
//     }
//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last Name is required";
//     }
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.userType) {
//       errors.userType = "User Type is required";
//     }
//     if (!formData.password.trim()) {
//       errors.password = "Password is required";
//     }
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     if (Object.keys(errors).length > 0) {
//       setErrors(errors);
//       return;
//     }

//     console.log(formData);

//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       userType: "",
//       password: "",
//       confirmPassword: "",
//     });
//     setErrors({});
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container-abed23s">
//         <div className="Inner-container-abed23s">
//           <h1>Register</h1>
//           <form className="formContainerabcd123" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="inputabcd123"
//               required
//             />
//             {errors.firstName && <p className="error">{errors.firstName}</p>}
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="inputabcd123"
//               required
//             />
//             {errors.lastName && <p className="error">{errors.lastName}</p>}
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="inputabcd123"
//               required
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//             <select
//               name="userType"
//               value={formData.userType}
//               onChange={handleChange}
//               className="selectabcd123"
//               required
//             >
//               <option value="">Select User Type</option>
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </select>
//             {errors.userType && <p className="error">{errors.userType}</p>}
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="inputabcd123"
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="inputabcd123"
//               required
//             />
//             {errors.confirmPassword && (
//               <p className="error">{errors.confirmPassword}</p>
//             )}
//             <button type="submit" className="buttonabcd123">
//               Register
//             </button>
//             <p className="already-registered">
//               Already Registered..? &nbsp;&nbsp;<Link>Login Here..</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;

import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import "../Register/Register.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      // Send POST request to backend endpoint
      console.log(response.data); // Log the response from the backend
      alert("registered successfully.. :)");
      // Reset form fields and errors
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        userType: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      setErrors(error.response.data.errors || {});
    }
  };

  return (
    <>
    <Navbar/>
      <div className="container-abed23s">
        <div className="Inner-container-abed23s">
          <h1>Register</h1>
          <form className="formContainerabcd123" onSubmit={handleSubmit}>
            {/* Your form inputs */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="inputabcd123"
              required
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="inputabcd123"
              required
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="inputabcd123"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="selectabcd123"
              required
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.userType && <p className="error">{errors.userType}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="inputabcd123"
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="inputabcd123"
              required
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
            <button type="submit" className="buttonabcd123">
              Register
            </button>
            <p className="already-registered">
              Already Registered..? &nbsp;&nbsp;<Link>Login Here..</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
