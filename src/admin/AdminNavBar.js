import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ViewCustomers from './ViewCustomers';
import ViewSellers from './ViewSellers';
import AdminHome from './AdminHome';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload();
  };

  return (
      <div>
        <nav>
          <ul>
            <li><Link to="/adminhome">Admin</Link></li>
            <li className="dropdown">
              <Link to="#">View</Link>
              <div className="dropdown-content">
                <Link to="/viewcustomers">View Customers</Link>
                <Link to="/viewsellers">View Sellers</Link>
              </div>
            </li>
            <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/adminhome" element={<AdminHome/>}exact />
          <Route path="/viewcustomers" element={<ViewCustomers />} />
          <Route path="/viewsellers" element={<ViewSellers />} />
        </Routes>
      </div>
  );
}
