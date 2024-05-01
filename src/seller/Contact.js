import React,{useState} from 'react'
import config from '../config'
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dateofbirth: '',
        email: '',
        password: '',
        location: '',
        contact: ''
      });
    
      //message state variable
      const [message, setMessage] = useState('');
      //error state variable
      const [error, setError] = useState('');
    
      const handleChange = (e) => 
      {
        
        setFormData({...formData, [e.target.id]: e.target.value});
      
      };
  return (
    <div>
        <h3><center>Contact Us</center></h3>
        <form>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={formData.name} onChange={handleChange} required />
        </div>
        </form>
    </div>
  )
}

