import React, { useState } from "react";
import "./StaffRegister.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StaffRegister = () => {
  const [section, setSection] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    designation: "",
    dob: "",
    sex: "",
    qualification: "",
    password: "",
    email: "",
    staffType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    setFormData({ ...formData, staffType: e.target.value }); // Update staffType based on selected section
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data, you can perform validation here
    console.log(formData);
  
    // Make a POST request to send formData to the backend
    fetch("http://localhost:5000/api/staff", { // Update URL to include port 5000
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };
  
  return (
    <div className="container-staffregister">
      <Link to="/Dashboard" className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ width: "25px", height: "25px" }}
          className="back-icon"
        />
      </Link>
      <div className="Inner-container-staffregister">
        <h1 className="title">Staff Registration</h1>
        <form className="formContainerabcd1234" onSubmit={handleSubmit}>
          <div className="form-group-staffRegister">
            <label htmlFor="section" className="section-label">
              Select Section:
            </label>
            <select
              id="section"
              name="staffType" // Change name to staffType
              value={section}
              onChange={handleSectionChange}
              className="section-select"
            >
              <option value="">Select Staff Type</option>
              <option value="FactoryStaff">Factory Staff</option>
              <option value="StoreStaff">Store Staff</option>
            </select>
          </div>
          <div className="form-columns">
            <div className="form-column">
              <div className="form-group-staffRegister">
                <label htmlFor="name" className="name-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="name-input"
                />
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="mobileNumber" className="mobileNumber-label">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="mobileNumber-input"
                />
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="dob" className="dob-label">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="dob-input"
                />
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="qualification" className="qualification-label">
                  Qualification:
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="qualification-input"
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-group-staffRegister">
                <label htmlFor="designation" className="designation-label">
                  Designation:
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="designation-input"
                />
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="sex" className="sex-label">
                  Sex:
                </label>
                <div className="sex-input">
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === "male"}
                      onChange={handleInputChange}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === "female"}
                      onChange={handleInputChange}
                    />{" "}
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="others"
                      checked={formData.sex === "others"}
                      onChange={handleInputChange}
                    />{" "}
                    Others
                  </label>
                </div>
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="password" className="password-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="password-input"
                />
              </div>
              <div className="form-group-staffRegister">
                <label htmlFor="email" className="email-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="email-input"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="buttonabcd1234567">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffRegister;
