import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import "./Signup.css"
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password: '',
    image: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email',formData.email);
    data.append('password', formData.password);
    data.append('image', formData.image);
    
    try {
      const response = await fetch('http://localhost/grocery_website/server/signup.php', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  
      <form className='Signup' onSubmit={handleSubmit} encType="multipart/form-data">
      <div className='main'>
          <h1>Signup to GroceryHub</h1>
          <input type="text" name="name"  placeholder='Enter your name' value={formData.username} onChange={handleInputChange} required/>
          <input type="email" name='email' placeholder='Enter your email' value={formData.email} onChange={handleInputChange} required/>
          <input type="password" name="password" placeholder='Enter your password' value={formData.password} onChange={handleInputChange} required/>
          <input type="file" name="image" onChange={handleImageChange} required/>
        <button type="submit">Signup</button>
        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
        </div>
      </form>

  );
};

export default Signup;
