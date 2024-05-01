import React from 'react'
import SellerLogin from './SellerLogin'
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import SellerRegistration from './SellerRegistration'
import SellerHome from './SellerHome'
import AddItems from './AddItems'
import Contact from './Contact'
import ViewItems from './ViewItems'
import ViewOrdersPlaced from './ViewOrdersPlaced'
import config from '../config'

export default function SellerNavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isSellerLoggedIn');
    localStorage.removeItem('seller');

    navigate('/sellerlogin');
    window.location.reload()
  };

  return (
    <div>

    <nav>
     <ul>
     <Link to="/sellerhome">Seller</Link>
     {/* <Link to="/sellerprofile">Seller Profile</Link> */}
     <li className="dropdown">
            <Link>Items</Link>
            <div className="dropdown-content">
            <Link to="/additem">Add an Item</Link>
            <Link to="/viewitems">View Items</Link>
            </div>
    </li>
    <Link to="/viewordersplaced">Orders</Link>
     <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
     </ul>
     </nav>

         <Routes>
         <Route path="/sellerhome" element={<SellerHome/>} exact/>
         {/* <Route path="/sellerprofile" element={<SellerProfile/>} exact/> */}
         <Route path="/additem" element={<AddItems/>} exact/>
         <Route path="/viewitems" element={<ViewItems/>} exact/>
         <Route path="/viewordersplaced" element={<ViewOrdersPlaced/>} exact/>
        </Routes>

    </div>
  )
}