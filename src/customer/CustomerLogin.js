import React, { useState } from 'react';
import './customer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function CustomerLogin({onCustomerLogin}) 
{
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post('http://localhost:2024/checkcustomerlogin', formData);
      if (response.data!=null) 
      {
        onCustomerLogin();

        localStorage.setItem('customer', JSON.stringify(response.data));
        navigate("/customerhome");
        // window.location.href="https://newerp.kluniversity.in/"
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div>
      <h3 align="center"><u>Customer Login</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}