import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'

export default function AddItems() {
  const [formData, setFormData] = useState({
    itemname: '',
    itemprice: '',
    type: '',
    description: '',
    imageUrl: '' 
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/additem`, formData);
      if (response.status === 200) {
        setFormData({
          itemname: '',
          itemprice: '',
          type: '',
          description: '',
          imageUrl: ''
        });
      }
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Add Item</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name</label>
          <input type="text" id="itemname" value={formData.itemname} onChange={handleChange} required />
        </div>
        <div>
          <label>Type</label>
          <select id="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="desert">Desert</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea type="text" id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Item Price</label>
          <input type="text" id="itemprice" value={formData.itemprice} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
