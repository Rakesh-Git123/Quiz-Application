import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import "./Home.css";
import AdminDashboard from './AdminDashboard';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { checkAuth, isAuthenticated, currentUser, userdetails } = useContext(DataContext);
  const navigate=useNavigate()

  useEffect(() => {
    checkAuth()
  },[])

  useEffect(()=>{
    if(isAuthenticated)
    currentUser()
  },[isAuthenticated])

  return (
    <div className='Home'>
      {
        isAuthenticated ?<></>:<div className='login-prompt'><p >Please login to take the quiz</p> <button onClick={()=>navigate("/login")}>Login</button></div>
      }
      {
        isAuthenticated && userdetails.role==="admin\r\n"?<AdminDashboard/>:<></>
      }
      {
        isAuthenticated && userdetails.role==="user"?
        <div className='student'>
          <div>
            <h1>Welcome {userdetails.name}</h1>
            <p>This is a student area where you can take quizzes, and the result will be sent to the admin after you have submitted</p>
            <button onClick={()=>navigate("/quiz")}>Take Quiz</button>
          </div>
        </div>
        :<></>
      }

    </div>
  );
};

export default Home;
