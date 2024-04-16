import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userlist.css'; // Import CSS file

const Userlist = () => {
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/registerdetails');
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchDetails();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredDetails = details.filter(detail =>
        detail.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='overalldiv'>
            <br/>
            <h1 className='details'> Registerdetails</h1>
            <br/>
            <div className='search-container098'>
            <input  className='search098'
                type="text"
                placeholder="Search here ...."
                value={searchQuery}
                onChange={handleSearch}
            />
            </div>
            
            <table className="user-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail.firstName}</td>
                            <td>{detail.lastName}</td>
                            <td>{detail.email}</td>
                            <td>{detail.userType}</td>
                            {/* <td>{Active}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>   
    );
};

export default Userlist;
