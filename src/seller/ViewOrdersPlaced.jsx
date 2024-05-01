import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seller.css'
import config from '../config'

export default function ViewOrdersPlaced() {

  const [sellerData, setSellerData] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  const [ordersPlaced, setOrdersPlaced] = useState([]);

  const fetchOrdersPlaced = async () => {
    try 
    {
      const response = await axios.get(`http://localhost:2024/viewordersplaced`);
      setOrdersPlaced(response.data);
    } 
    catch (error) 
    {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    fetchOrdersPlaced();
  }); 

  const handleStatusChange = async (orderId, status) => {
    try 
    {
      const response = await axios.post('http://localhost:2024/changestatus', { orderId, status });
      fetchOrdersPlaced();
      setMessage(response.data);
      setError(''); 
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage(''); 
    }
  };

  return (
    <div className="table-container">
        <h3>Orders</h3>
        {
          message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
        }
        <table className="job-table mx-auto" align='center'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Status</th>
                    <th>Ordered Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(ordersPlaced) && ordersPlaced.length > 0 ? (
                    ordersPlaced.map((order, index) => (
                        <tr key={index}>
                            <td>{order.applicantId}</td>
                            <td>{order.itemname}</td>

                <td >
                {order.itemStatus}
                </td>
                           
                            <td>{order.orderedTime}</td>
                            <td>
                              <button className='selected' onClick={() => handleStatusChange(order.orderId,"ACCEPT")}>ACCEPT</button>
                              <button className='rejected' onClick={() => handleStatusChange(order.orderId,"CANCEL")}>CANCEL</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No Orders found</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
}