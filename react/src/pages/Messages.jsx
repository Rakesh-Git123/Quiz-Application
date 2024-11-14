import React, { useContext, useEffect, useState } from 'react'
import "./Messages.css"
import { DataContext } from '../context/DataContext';

const Messages = () => {
    const [message, setMessage] = useState([]);
    const { checkAuth, isAuthenticated,currentUser,userdetails } = useContext(DataContext);

    useEffect(() => {
        checkAuth();
        fetchMessage();
    }, []);

    useEffect(()=>{
        if(isAuthenticated)
        currentUser()
      },[isAuthenticated])

      const fetchMessage = async () => {
        try {
            const response = await fetch('http://localhost/grocery_website/server/get_messages.php', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            setMessage(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMessage = async (id) => {

        try {
          const response = await fetch(`http://localhost/grocery_website/server/delete_message.php`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id }),
          });
      
          const data = await response.json();
          alert(data.message)
          fetchMessage()
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='Messages'>
        {
                isAuthenticated && userdetails.role==="admin\r\n"?
            <>
            <h2>User Messages</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        message.length>0?
                        (message.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={"http://localhost/grocery_website/server/uploads/"+ item.image} alt={`${item.name}'s profile`}/></td>
                                <td>{item.name}</td>
                                <td>{item.message}</td>
                                <td><i class="fa-solid fa-trash" onClick={()=>deleteMessage(item.id)}></i></td>
                            </tr>
                        ))):
                        <tr>
                            <td colSpan="5">No message found</td>
                        </tr>

                    }
                </tbody>
            </table>
            </>
            :
            <>You are not authorized</>
            }
    </div>
  )
}

export default Messages