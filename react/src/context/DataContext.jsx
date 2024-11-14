
const { createContext,useState,useEffect } = require("react");

export const DataContext=createContext();

export const DataProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const[email,setemail]=useState("")
    const [userdetails,setuserDetails]=useState({});   

    const checkAuth = async () => {
        try {
          let res = await fetch('http://localhost/grocery_website/php/check_auth.php', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          let data = await res.json();
          
          // Handle the authentication response
          if (data.authenticated) {
            setIsAuthenticated(true);
            setemail(data.email);
          }
          else{
            setIsAuthenticated(false)
            setemail("")
            setuserDetails({})
          }
        } catch (err) {
          console.log('Error:', err);
        }
      };

      const currentUser=async()=>{
        try {
          let res = await fetch('http://localhost/grocery_website/php/currentuser.php', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({email})
          });
          let data = await res.json();
          setuserDetails({name:data.name,email,image:data.image,role:data.role})
          
        } catch (err) {
          console.log('Error:', err);
        }
      }


      const logout=async()=>{
        try{
            let res = await fetch('http://localhost/grocery_website/php/logout.php',{
                method:"GET",
                credentials: 'include'
            })
            let data=await res.json();
            checkAuth()
            alert(data.message)
        }
        catch(err){
            console.log(err);
        }
      }
  
      return(
        <DataContext.Provider value={{checkAuth,isAuthenticated,logout,currentUser,userdetails}}>{children}</DataContext.Provider>
      ) 
}