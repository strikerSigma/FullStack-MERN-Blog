import { useState } from "react"
import {Navigate} from 'react-router-dom'
import { MyContext } from "../App";
import {useContext} from "react";

const Login = () => {
  const [username,setUsername] = useState('Abdullah')
  const [password,setPassword] = useState('Abdullah')
  const [redirect,setRedirect] = useState(false)
  const {isAuthenticated, setIsAuthenticated } = useContext(MyContext);

  const login = async (e)=>{
    e.preventDefault();
    try{
    const response =  await fetch('http://localhost:3000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
      credentials: 'include'
    })
    if(response.ok){
      let dat =  await response.json()
      console.log(dat);
      setIsAuthenticated(!isAuthenticated)
      if(dat.accessToken){
        localStorage.setItem('access_token', dat.accessToken);
        setRedirect(true)
      }
     
    }
    else{alert('Login failed')}
  }
  catch(e){
  console.log(e)
}

}

if(redirect){
   return <Navigate to={'/'}/>
  //  window.location.reload(false);
}

  return (
    <form onSubmit={login}>
        <h2>Login Page</h2>
  <input type="text"  placeholder="Enter your username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>


  <input type="password"  placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

  <button>Login</button>
    </form>
  )
}

export default Login