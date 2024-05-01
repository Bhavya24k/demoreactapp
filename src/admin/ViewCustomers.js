import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:2024/viewcustomers');
      setCustomers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (email) => {
    try {
      await axios.delete(`http://localhost:2024/deletecustomer/${email}`);
      fetchCustomers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="container">
      <h1>Customers</h1>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.fullname}</td>
                <td>{customer.gender}</td>
                <td>{customer.dateofbirth}</td>
                <td>{customer.email}</td>
                <td>{customer.location}</td>
                <td>{customer.contact}</td>
                <td>
                  <button onClick={() => deleteCustomer(customer.email)} className='button'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
