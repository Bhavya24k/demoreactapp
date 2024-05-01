import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seller.css'; 
import config from '../config'

export default function ViewItems() {
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:2024/viewitems');
      setItems(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteItem = async (itemName) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:2024/deleteitem`);
        fetchItems();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      fetchItems();
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-9 d-flex flex-column align-items-center">
          <div className="title">
            <h3>Available Items</h3>
          </div>
          <div className="cards">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item, index) => (
                <div className="card my-3" key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{item.itemname}</h5>
                    <img src={item.imageUrl} alt={item.itemname} className="card-img-top" />
                    <p className="card-text">Type: {item.type}</p>
                    <p className="card-text">Description: {item.description}</p>
                    <p className="card-text">Price: {item.itemprice}</p>
                    <button onClick={() => deleteItem(item.itemId)} className='button'>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card my-3">
                <div className="card-body">
                  <p className="card-text">Data Not Found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
