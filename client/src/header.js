import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'


export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:9002/profile',{
      credentials:'include',
    }).then(response =>{
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      });
    })
  },[])

  function logout(){
    fetch('http://localhost:9002/logout',{
      credentials : 'include',
      method : 'POST',
    });
    setUserInfo(null);
  }

  const username= userInfo?.username;

  return (
    <header>
    <Link to="/" className="logo">Blogger</Link>
    <nav>
      {username && (
        <>
        <Link to ='/create'>Create new post</Link>
        <a onClick={logout}>Logout</a>
        </>
      )}
      {!username && (
          <>

      <Link to="/login" className='signin'>Login</Link>
      <Link to="/register" className='signup'>Sign Up</Link>
       </>
          )}
      </nav>
  </header>
  )
}
