import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userlist.css'; // Import CSS file
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';


const Userlist = () => {
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/registerdetails');
                setDetails(response.data);
                const activeStoreIds = response.data.map(detail => detail.storeId);
                setActiveUsers(activeStoreIds);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchDetails();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleActivate = async (storeId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/activate', { storeId });
            if (response.status === 200) {
                setActiveUsers(prevActiveUsers => [...prevActiveUsers, storeId]);
                setPopupMessage('User activated successfully');

                // Redirect the user to the login page and auto-fill the fields
                setTimeout(() => {
                    // Replace this URL with your login page URL
                    window.location.href = 'http://localhost:3000/login';

                    // Wait a short delay before filling the form fields
                    setTimeout(() => {
                        // Assuming storeId and password are input field IDs
                        document.getElementById('storeId').value = storeId;
                        document.getElementById('password').value = 'password'; // Assuming a default password

                        // Submit the form
                        document.getElementById('loginForm').submit();
                    }, 1000); // Adjust the delay as needed
                }, 2000); // Adjust the delay as needed

                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error activating user:', error);
            setPopupMessage('An error occurred while activating user');
            setShowPopup(true);
        }
    };


    const handleDeactivate = async (storeId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/deactivate', { storeId });
            if (response.status === 200) {
                setActiveUsers(prevActiveUsers => prevActiveUsers.filter(id => id !== storeId));
                setPopupMessage('User deactivated successfully');
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error deactivating user:', error);
            setPopupMessage('An error occurred while deactivating user');
            setShowPopup(true);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const filteredDetails = details.filter(detail =>
        (detail.email && detail.email.toLowerCase().includes(searchQuery)) ||
        (detail.storeId && detail.storeId.toLowerCase().includes(searchQuery))
    )
    return (
        <>
            <Navbar />
            <br />
            <div className='overalldiv'>
                <br />
                <h1 className='details'>Register Details</h1>
                <br />
                <div className='search-container098'>
                    <input
                        className='search098'
                        type="text"
                        placeholder="Search here ...."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <table className="lab-service-table_5">
                    <thead>
                        <tr className="product-ooi">
                            <th>Store ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDetails.map((detail) => (
                            <tr key={detail._id}>
                                <td>{detail.storeId}</td>
                                <td>{detail.lastName}</td>
                                <td>{detail.email}</td>
                                <td>{detail.userType}</td>
                                <td onClick={() => {
                                    if (activeUsers.includes(detail.storeId)) {
                                        handleDeactivate(detail.storeId);
                                    } else {
                                        handleActivate(detail.storeId);
                                    }
                                }}>
                                    {activeUsers.includes(detail.storeId) ? (
                                        <FontAwesomeIcon icon={faToggleOn} className='toggle-icon active' />
                                    ) : (
                                        <FontAwesomeIcon icon={faToggleOff} className='toggle-icon inactive' />
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={handlePopupClose}>&times;</span>
                            <p>{popupMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Userlist;
