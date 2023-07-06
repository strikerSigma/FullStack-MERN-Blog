//import { Link } from "react-router-dom"
import {useContext} from "react";
import { MyContext } from "../App";

import { useEffect } from "react";


export const Header = () => {
  const { userinfo, setUserinfo,isAuthenticated, setIsAuthenticated  } = useContext(MyContext);
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('access_token');
      console.log(accessToken);
      fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.username);
          setUserinfo(data)
          // Handle the response from the backend
        })
        .catch(error => {
          console.error(error);
          // Handle the error
        });
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated]);
  
  const logout = () => {
    localStorage.removeItem('access_token');
    setUserinfo(undefined);
    setIsAuthenticated(!isAuthenticated)
  };

  return (
    
    <header>
          <a href="/" className='Logo'>MyBlog</a>
          <nav>
            {userinfo.username && 
            <>
            <a href='/create'>Create new post</a>
            <a onClick={logout} href='/'>Logout</a>
            </>}
            {!userinfo.username && 
            <>
            <a href="/login">Login</a>
            <a href="/Register" >Register</a>
            </>}
            
          </nav>
    </header>
    
  )
}
