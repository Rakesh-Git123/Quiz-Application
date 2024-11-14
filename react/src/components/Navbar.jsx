import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { DataContext } from '../context/DataContext'
const Navbar = () => {
    const {isAuthenticated,logout,currentUser,userdetails,checkAuth}=useContext(DataContext);
    let navigate=useNavigate()
    let a=useRef();
    const showProfile=()=>{
        a.current.style.display="flex"
    }
    const closeProfile=()=>{
        a.current.style.display="none"
    }

    useEffect(()=>{
        checkAuth()
    },[])

    useEffect(()=>{
        if(isAuthenticated){
            currentUser()
        }
    },[isAuthenticated])



    return (
        <div className='Navbar'>
            <div className="left">
                <p className="logo" style={{margin:"0",cursor:"pointer"}} onClick={()=>navigate("/")}>QuizMaster</p>
            </div>
            <div className="right" >
                <ul style={{margin:"0"}}>
                    <li onClick={()=>navigate("/")}>Home</li>
                    {
                        isAuthenticated && userdetails.role==="admin\r\n"?
                        <>
                        <li onClick={()=>navigate("/result")}>Result</li>
                        <li onClick={()=>navigate("/message")}>Messages</li>
                        </>
                        :<></>
                    }
                    {
                        isAuthenticated && userdetails.role==="user"?
                        <>
                        <li onClick={()=>navigate("/leaderboard")}>Leaderboard</li>
                        <li onClick={()=>navigate("/contact")}>Contact us</li>
                        </>
                        :<></>

                    }
                    <i className="fa-regular fa-user" id='profile' onClick={showProfile}></i>

                </ul>
            </div>
            <div className='profile' ref={a}>
            <i className="fa-solid fa-xmark" id='cross' onClick={closeProfile}></i>
                <img className='img' src={!userdetails.image?"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg":"http://localhost/grocery_website/php/uploads/"+ userdetails.image} alt="" />
                <p className="name">{userdetails.name?userdetails.name:"User"}</p>
                {
                    isAuthenticated && userdetails.role==="user"? <button className='updateprofile'>Update Profile</button>:<></>
                }
                {
                    isAuthenticated?<button className='logoutbtn' onClick={()=>{
                        logout()
                        navigate("/login")
                    }}>Logout</button>:
                    <div className='login'>
                    <button className='loginbtn' onClick={()=>{navigate("/login")}}>Login</button>
                    <button className='signupbtn' onClick={()=>{navigate("/signup")}}>Signup</button>
                </div>

                }  
                
            </div>
        </div>
    )
}

export default Navbar