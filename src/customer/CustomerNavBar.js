import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './customer.css';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import ViewItemsPosted from './ViewItemsPosted';
import ViewOrders from './ViewOrders';
import UpdateProfile from './UpdateProfile';

export default function CustomerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');

    navigate('/customerlogin');
    window.location.reload()
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/customerhome">Customer</Link></li>
          <li><Link to="/viewitemsposted">View Items</Link></li>
          <li><Link to="/orders">My Orders</Link></li>
          <li className="dropdown">
          <Link>Profile</Link>
          <div className="dropdown-content">
            <Link to="/customerprofile">View Profile</Link>
            <Link to="/updateprofile">Update Profile</Link>
            </div>
            </li>
          <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
       
        </ul>
      </nav>

      <Routes>
        <Route path="/customerhome" element={<CustomerHome/>} exact />
        <Route path="/customerprofile" element={<CustomerProfile/>} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/viewitemsposted" element={<ViewItemsPosted/>} exact />
        <Route path="/orders" element={<ViewOrders/>} exact />
        {/* <Route path="/orderitems" element={<OrderItems/>} exact/> */}
      </Routes>
    </div>
  );
}

