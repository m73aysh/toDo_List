import React , {useState } from 'react'
import axios from "axios"
import {Routes , Route , Link} from "react-router-dom"


export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")


    const registerFunc = (e) => {
      e.preventDefault()
      const newUser ={
        // ES6
        email, // "email": value in the state
        password,
        username
      }
      axios
      .post(`http://localhost:5000/users/register` , newUser)
      .then((response) => {
        console.log("Response: " , response.data);
  
      })
      .catch((err) => {
        console.log("Error: " , err);
      })
    }

  return (
    <div className='Register'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        
        <form action=''>
        
        <label>E-mail: </label>
        <input type = "email" placeholder='write your email' onChange={ (event) => {setEmail(event.target.value)}} 
        value = {email}/>
        <br/>

        <label>Password: </label>
        <input type = "password" placeholder='write your password' onChange={ (event) => {setPassword(event.target.value)}}  
        value = {password}/>
        <br/>
        
        <label>Username: </label>
        <input type = "text" placeholder='write your username' onChange={ (event) => {setUsername(event.target.value)}} 
        value = {username}/>
        <br/>
        
        <input type = "submit" value = "Register" onClick={registerFunc}/>
        
        <Link to = "/Login">have an Account ?</Link>
        </form>
    
    </div>
  )
}
