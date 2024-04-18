import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <img src="https://static.vecteezy.com/system/resources/previews/020/735/723/original/laundry-logo-design-illustration-dry-cleaning-logo-template-and-simple-logo-laundry-for-your-business-free-vector.jpg" alt="Logo" />
            </div>
            <div className="sidebar-links">
                <Link to="" className="sidebar-link">
                    Dashboard
                </Link>
                <Link to="/orderstable" className="sidebar-link">
                    Orders
                </Link>
                <Link to="/rating" className="sidebar-link">
                    Customers
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
