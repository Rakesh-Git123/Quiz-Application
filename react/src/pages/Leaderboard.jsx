import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext';
import "./Leaderboard.css"
const Leaderboard = () => {
    const { checkAuth, isAuthenticated} = useContext(DataContext);
    const [leaderboardData, setLeaderboardData] = useState([])
    useEffect(() => {
        checkAuth()
        fetchScores()
    }, [])


    const fetchScores = async () => {
        try {
            let res = await fetch("http://localhost/grocery_website/php/leaderboard.php", {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            let data = await res.json()
            setLeaderboardData(data)
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchImage=async(image)=>{
        try{
            let res=await fetch("http://localhost/grocery_website/php/getImage.php",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({image})
        })

        let data=await res.json()
        return data.imagePath;
        }
        catch(err){
            console.log(err);
        }

    }
    return (
        <div className='Leaderboard'>
             <h2>Quiz Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Image</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((leader, index) => (
            <tr key={leader.id}>
              <td>{index + 1}</td>
              <td>
                <img src={"http://localhost/grocery_website/php/uploads/"+ leader.image} alt={`${leader.name}'s profile`} className="leader-image" />
              </td>
              <td>{leader.name}</td>
              <td>{leader.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Leaderboard