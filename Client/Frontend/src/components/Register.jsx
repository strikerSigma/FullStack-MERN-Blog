import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../App.css'

const Register = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

        const register = async (ev) =>{
          ev.preventDefault();
          const response = await fetch('http://localhost:3000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
          })
          
          if(!response.ok){
            alert('registeration failed')
          }
          else{alert('Registeration request sent')}
          <Navigate to={'/'}/>
    }
  return (
    <form onSubmit={register}>
        <h2>Register Page</h2>
  <input type="text" value={username} onChange={event => {setUsername(event.target.value)}}  placeholder="Enter your username" required/>


  <input type="password" value={password} onChange={event => {setPassword(event.target.value)}}  placeholder="password" required/>

  <button>Register</button>
    </form>
  )
}

export default Register