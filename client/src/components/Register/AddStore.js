import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AddStore.css";

function AddStore() {
  const [formData, setFormData] = useState({
    storeName: "",
    gstNumber: "",
    state: "",
    city: "",
    area: "",
    address: "",
    pincode: "",
    adminName: "",
    designation: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
    storeImages: [],
    licenseAgreement: null,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    // Validation
    if (!nameRegex.test(formData.storeName)) {
      toast.error("Invalid store name");
      return;
    }
    if (!formData.gstNumber) {
      toast.error("GST number is required");
      return;
    }
    if (!mobileRegex.test(formData.mobileNumber)) {
      toast.error("Invalid mobile number");
      return;
    }
    // Add more validations for other fields

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      console.log(response.data);
      // Handle success
      toast.success("Registration successful");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error
      toast.error("Registration failed");
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const filesArray = Array.from(e.target.files);
      const filePaths = filesArray.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, [e.target.name]: filePaths });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h1>Register Store</h1>
          <form className="formContainerabcd123" onSubmit={handleRegister}>
            {/* New form fields */}
            <input
              name="storeName"
              type="text"
              placeholder="Store Name"
              value={formData.storeName}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="gstNumber"
              type="text"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
           
            <input
              name="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="area"
              type="text"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="pincode"
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="adminName"
              type="text"
              placeholder="Admin Name"
              value={formData.adminName}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="designation"
              type="text"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="emailAddress"
              type="email"
              placeholder="Email Address"
              value={formData.emailAddress}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="mobileNumber"
              type="text"
              placeholder="Admin Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <input
              name="password"
              type="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="inputabcd123"
            />
            <label htmlFor="storeImages">Store Images:</label>
            <input
              name="storeImages"
              type="file"
              multiple
              onChange={handleChange}
              className="inputabcd123"
            />
            <label htmlFor="licenseAgreement">License Agreement:</label>
            <input
              name="licenseAgreement"
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseAgreement: e.target.files[0].name,
                })
              }
              required
              className="inputabcd123"
            />

            <button type="submit" className="buttonabcd123">
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddStore;
