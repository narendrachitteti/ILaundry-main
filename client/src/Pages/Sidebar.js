import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <img src="https://static.vecteezy.com/system/resources/previews/020/735/723/original/laundry-logo-design-illustration-dry-cleaning-logo-template-and-simple-logo-laundry-for-your-business-free-vector.jpg" alt="Logo" />
            </div>
            <div className="sidebar-links">
                <Link to="/Dashboard" className="sidebar-link">
                    Dashboard
                </Link>
                {/* <Link to="/Bills" className="sidebar-link">
                    Customer Bills
                </Link>
                <Link to="/PreviousBills" className="sidebar-link">
                Previous Bills
                </Link>
                <Link to="/Userlist" className="sidebar-link">
                Registerdetails
                </Link> */}
                <Link to="/orderstable" className="sidebar-link">
                    Recent Orders
                </Link>
                <Link to="/rating" className="sidebar-link">
                    Customer Reviews
                </Link>
                
            </div>
            
        </div>
    );
};

export default Sidebar;
