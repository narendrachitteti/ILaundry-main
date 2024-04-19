import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userlist.css'; // Import CSS file
import Navbar from './Navbar';

const Userlist = () => {
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/registerdetails');
                setDetails(response.data);
                // Check if store IDs are active and set activeUsers accordingly
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

    const handleActivate = (storeId) => {
        setSelectedStoreId(storeId);
        if (!activeUsers.includes(storeId)) {
            setActiveUsers(prevActiveUsers => [...prevActiveUsers, storeId]);
        }
    };

    const handleDeactivate = (storeId) => {
        setSelectedStoreId(storeId);
        if (activeUsers.includes(storeId)) {
            setShowPopup(true);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const filteredDetails = details.filter(detail =>
        detail.email && detail.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <br />
            <br />
            <br />
            <div className='overalldiv'>
                <br />
                <h1 className='details'>Register Details</h1>
                <br />
                <div className='search-container098'>
                    <input className='search098'
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
                                <td>
                                    {activeUsers.includes(detail.storeId) ? (
                                        <button className='button-active'>Active</button>
                                    ) : (
                                        <button onClick={() => handleActivate(detail.storeId)} className='button-active'>Activate</button>
                                    )}
                                    <button onClick={() => handleDeactivate(detail.storeId)} className='button-inactive'>Inactive</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={handlePopupClose}>&times;</span>
                            <p>User is already active!</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Userlist;
