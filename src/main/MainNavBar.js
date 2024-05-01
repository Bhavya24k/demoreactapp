import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './MainHome';
import Contact from './Contact';
import CustomerLogin from './../customer/CustomerLogin';
import Registration from './../customer/Registration';
import AdminLogin from './../admin/AdminLogin';
import SellerLogin from '../seller/SellerLogin';
import PageNotFound from './PageNotFound';
import SellerRegistration from './../seller/SellerRegistration';
import config from '../config'

export default function MainNavBar({ onAdminLogin, onCustomerLogin, onSellerLogin }) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link>Registration</Link>
            <div className="dropdown-content">
              <Link to="/customerregistration">Customer Registration</Link>
              <Link to="/sellerregistration">Seller Registration</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link>Login</Link>
            <div className="dropdown-content">
              <Link to="/customerlogin">Customer Login</Link>
              <Link to="/sellerlogin">SellerLogin</Link>
              <Link to="/adminlogin">Admin Login</Link>
            </div>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/customerregistration" element={<Registration />} exact />
        <Route path="/sellerregistration" element={<SellerRegistration />} exact />
        <Route path="/customerlogin" element={<CustomerLogin onCustomerLogin={onCustomerLogin} />} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
        <Route path="/sellerlogin" element={<SellerLogin onSellerLogin={onSellerLogin} />} exact />
        <Route path="/contact" element={<Contact />} exact />
        
      </Routes>
    </div>
  );
}
