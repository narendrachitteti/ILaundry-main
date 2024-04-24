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

    const handleActivate = async (storeId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/activateUser', { storeId });
            if (response.status === 200) {
                setActiveUsers(prevActiveUsers => [...prevActiveUsers, storeId]);
                setPopupMessage('');
            }
        } catch (error) {
            console.error('Error activating user:', error);
        }
    };
    

    const handleDeactivate = (storeId) => {
        setShowPopup(true);
        setPopupMessage('User is inactive!'); // Set the message for the popup
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const filteredDetails = details.filter(detail =>
        detail.email && detail.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
    <>
        <Navbar/>
        <div className='overalldiv'>
            <br/>
            <h1 className='details'> Register Details</h1>
            <br/>
            <div className='search-container098'>
            <input  className='search098'
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
                        {/* <th>Last Name</th> */}
                        <th>Email</th>
                        <th>User Type</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail.storeId}</td>
                            {/* <td>{detail.lastName}</td> */}
                            <td>{detail.email}</td>
                            <td>{detail.userType}</td>
                            {/* <td>{Active}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>   
        </>
    );
};

export default Userlist;
