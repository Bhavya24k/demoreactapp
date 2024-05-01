import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'


export default function ViewSellers() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:2024/viewsellers');
      setSellers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  const deleteSeller = async (email) => {
    try {
      await axios.delete(`http://localhost:2024/deleteseller/${email}`);
      fetchSellers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' , marginLeft:'250px'}}>
      <h1>Sellers</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Restaurant Address</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
  {Array.isArray(sellers) && sellers.length > 0 ? (
    sellers.map((seller, index) => (
      <tr key={index}>
        <td>{seller.ownername}</td>
        <td>{seller.restaurantname}</td>
        <td>{seller.email}</td>
        <td>{seller.contact}</td>
        <td>{seller.address}</td>
        <td>
          <button onClick={() => deleteSeller(seller.email)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}