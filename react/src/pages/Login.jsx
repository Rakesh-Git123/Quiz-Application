import React, { useContext, useState } from 'react';
import "./Login.css"
import {NavLink,useNavigate} from 'react-router-dom'
import { DataContext } from '../context/DataContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const {checkAuth}=useContext(DataContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/grocery_website/php/login.php', {
        method:"POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password})
    });
      const result = await response.json();
      if(result.success){
        alert(result.message)
        checkAuth()
        navigate("/")
      }
      else{
        alert(result.message)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <div className="main">
      <h1>Login to your account</h1>
        <input
          type="text"
          value={email}
          placeholder='Enter your email'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Enter your password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      <button>Login</button>
      <p>Not have an account? <NavLink to="/signup">Signup</NavLink></p>
      </div>
    </form>
  );
};

export default Login;
