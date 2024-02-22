import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image14 from "../assets/images/ilaundry.jpg";
import image15 from "../components/images/bills.jpg";
import image16 from "../components/images/profile.jpg";
import image17 from "../components/images/customer.jpg";
import { IoLogOutOutline } from "react-icons/io5";
import "../Styles/Navbar.css"
import axios from 'axios';
import { BASE_URL } from '../Helper/Helper';
const Navbar = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("mail");
    if (storedEmail) {
      // Make a request to fetch user by email when the component mounts
      axios.get(`${BASE_URL}/users/${storedEmail}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user by email:', error);
        });
    }
  }, []);

  const logout=()=>{
    navigate('/');
    localStorage.removeItem("mail")
  };

  
  return (
    <div>
      <div className="button-container23" >
        <Link to="/"><img src={image14} alt='' style={{ height: '3rem', width: '10rem', marginLeft: '-9%' }} /></Link>
        <Link to="/Bills">
          <div className='bills'>
            <img src={image17} alt='' style={{ height: '2.5rem' }} /><p>Customer Bills</p>
          </div>
        </Link>
        <Link to="/PreviousBills">
          <div className='bills'>
            <img src={image15} alt='' style={{ height: '2.5rem' }} /><p>Previous Bills</p>
          </div>
        </Link>
        <div className='bills'>
          <img src={image16} alt='' style={{ height: '2.5rem' }} />
          <p>Profile</p>
          <div class="dropdown-content">
            <p>{user ? `${user.firstName} ${user.lastName}` : 'Username'}</p>
            <p onClick={logout} style={{display:'flex',alignItems:'center',gap:'1rem'}}>Logout<IoLogOutOutline /> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
