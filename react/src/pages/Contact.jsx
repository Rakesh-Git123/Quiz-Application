import React, { useContext, useEffect, useState } from 'react'
import contact from "../images/contact.webp"
import "./Contact.css"
import { DataContext } from '../context/DataContext';
const Contact = () => {
  const { checkAuth, isAuthenticated,currentUser,userdetails } = useContext(DataContext);
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [message,setMessage]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      let res=await fetch('http://localhost/grocery_website/server/contact.php',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({name,image:userdetails.image,email,message})
      })
      let data=await res.json();
      alert(data.message)

    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    checkAuth()
  }, []);

  useEffect(()=>{
    if(isAuthenticated)
    currentUser()
  },[isAuthenticated])
  return (
    <div className='Contact'>
        <div className='message'>
        <form onSubmit={handleSubmit}>
            <p>Contact us</p>
            <input className='input1' type="text" required placeholder='Name' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
            <input className='input2' type="email" required placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <textarea placeholder='Message' required value={message} name='message' onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button className='button1'>Submit</button>
        </form>
        <div className='image'>
          <img src={contact} alt="" />
        </div>
        </div>
    </div>
  )
}

export default Contact