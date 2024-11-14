import React, { useContext, useEffect, useState } from 'react';
import './Result.css';
import { DataContext } from '../context/DataContext';

const Result = () => {
    const [result, setResult] = useState([]);
    const { checkAuth, isAuthenticated,currentUser,userdetails } = useContext(DataContext);


    useEffect(() => {
        checkAuth();
        fetchResult();
    }, []);

    useEffect(()=>{
        if(isAuthenticated)
        currentUser()
      },[isAuthenticated])

    const fetchResult = async () => {
        try {
            const response = await fetch('http://localhost/grocery_website/php/get_result.php', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteResult = async (email) => {

        try {
          const response = await fetch(`http://localhost/grocery_website/php/delete_result.php`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email }),
          });
      
          const data = await response.json();
          alert(data.message)
          fetchResult()
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className='Result'>
            {
                isAuthenticated && userdetails.role==="admin\r\n"?
            <>
            <h2>User Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.length>0?
                        (result.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={"http://localhost/grocery_website/php/uploads/"+ item.image} alt="" /></td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                                <td><i class="fa-solid fa-trash" onClick={()=>deleteResult(item.email)}></i></td>
                            </tr>
                        ))):
                        <tr>
                            <td colSpan="4">No result found</td>
                        </tr>

                    }
                </tbody>
            </table>
            </>
            :
            <>You are not authorized</>
            }
        </div>
    );
};

export default Result;
