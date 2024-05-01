import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewOrders() {
    const [customerData, setCustomerData] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomerData(parsedCustomerData);
        }
    }, []); // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
        if (customerData) {
            fetchOrders();
        }
    }); 

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:2024/orders/${customerData.email}`);
            setOrders(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className="table-container">
            <h3>Order Status</h3>
            {error && <h4 align="center" style={{ color: "red" }}>{error}</h4>}
            <table className="job-table mx-auto" align='center'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Item Name</th>
                        <th>Status</th>
                        <th>Ordered Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderId}</td>
                                <td>{order.Itemname}</td>

               
                                <td style={{
                  backgroundColor: order.itemStatus === 'ACCEPT' ? 'green' : order.itemStatus === 'CANCEL' ? 'red' : 'grey',
                  padding: '5px 10px',
                }}>
                  {order.itemStatus}
                </td>

                                <td>{order.orderedTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}