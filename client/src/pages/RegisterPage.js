import React, { useState } from 'react'
import {Navigate} from "react-router-dom";


export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword]= useState('');
    const [redirect, setRedirect]= useState('')

   async function register(ev){
      ev.preventDefault();

      if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
        return;
      }
      
  const response =  await  fetch('http://localhost:9002/register', {
        method: 'POST',
        body: JSON.stringify({username,password}),
        headers: {'Content-Type':'application/json'},
      })
      if (response.status === 200) {
        alert('Registration successful');
        setRedirect(true)
      } else {
        alert('Registration failed');
      }
    }

    if (redirect) {
      return <Navigate to={'/'} />
    }

  return (
    <div onSubmit={register}>
        <form className="login" >
      <h1>Sign Up</h1>
      <input type="text"
             placeholder="Create username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}
            />
      <input type="password"
             placeholder="Create password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}
            />
      <button>Register</button>
    </form>
    </div>
  )
}
