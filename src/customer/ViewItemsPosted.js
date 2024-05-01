import config from '../config'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewItems() {
  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${config.url}/viewitems`);
      setItems(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchItems();
  }); 

  const orderItem = async (itemname,customeremail) => {
    try 
    {
      const response = await axios.post(`${config.url}/orderitems`, { itemname, customeremail });
      fetchItems();
      setMessage(response.data);
      setError('');
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  }

  return (
    <div className="container">
      <h3>Available Items</h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"black"}}>{error}</h4>
      }
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                {item.imageUrl && (
                  <img src={item.imageUrl} className="card-img-top" alt={item.itemname} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.itemname}</h5>
                  <p className="card-text">Type: {item.type}</p>
                  <p className="card-text">Description: {item.description}</p>
                  <p className="card-text">Price: {item.itemprice}</p>
                  <button className='button' onClick={() => orderItem(item.itemname,customerData.email)}>Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

