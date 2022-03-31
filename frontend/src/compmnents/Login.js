import axios from 'axios'
import React, { useState } from 'react'
import {Routes , Route , Link} from "react-router-dom"


export default function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginFunc = (e) => {
        e.preventDefault()
        const userInfo ={
          email, // "email": email ES6
          password,
        }
        axios
        .post(`http://localhost:5000/user/login` , userInfo)
        .then((response) => {
          console.log("Response: " , response.data);
          props.setIsLoggedIn(true)
          props.setUsername(response.data.username)
        })
        .catch((err) => {
          console.log("Error: " , err);
        })
    }
  return (
    <div className='Login'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        
        <form action=''>
        
        <div className="form-floating m-3">
          <input type="email" className="form-control" id="floatingInput" placeholder='Email address' onChange={(e) => {setEmail (e.target.value)}}
        value = {email}/>
          <label for="floatingInput">Email address</label>
        </div>
       
        <div className="form-floating m-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => {setPassword (e.target.value)}}
        value = {password}/>
          <label for="floatingPassword">Password</label>
        </div>
        
        <input  className='button m-3' type = "submit" value="Login" onClick={loginFunc}/>
        
        <Link to = "/register">Don't have an Account ?</Link>
        
        </form>
    </div>
  )
}
