import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userlist.css'; // Import CSS file

const Userlist = () => {
    const [details, setDetails] = useState([]);

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

    return (
        <div className='overalldiv'>
            <h1 className='details'> Registerdetails</h1>
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
                    {details.map((detail) => (
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
