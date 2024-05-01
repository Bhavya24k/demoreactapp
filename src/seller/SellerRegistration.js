import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'

export default function SellerRegistration() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    ownername: '',
    restaurantname: '',
    email:'',
    password: '',
    contact: '',
    address: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

const changetext = (e) =>{
  const txt = e.target.value.toUpperCase()
  e.target.value=txt
}


  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post('http://localhost:2024/insertseller', formData);
      if (response.status === 200) 
      {
        setFormData({
          ownername: '',
          restaurantname: '',
          email:'',
          password: '',
          contact: '',
          address: ''
        });
      }
      setMessage(response.data);
      setError('');
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  return (
    <div>
      <h3 align="center"><u> Seller Registration</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }

      <form onSubmit={handleSubmit}>
        <div>
          <label>Owner Name</label>
          <input type="text" id="ownername" value={formData.ownername} onChange={handleChange}  onKeyUp={changetext} required />
        </div>
        <div>
          <label>Restaurant Name</label>
          <input type="text" id="restaurantname" value={formData.restaurantname} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <textarea type="text" id="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}