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

        <div className="form-floating m-3">
          <input type="email" className="form-control" id="floatingInput" placeholder='Email address' onChange={ (event) => {setEmail(event.target.value)}} 
        value = {email}/>
          <label for="floatingInput">Email address</label>
        </div>

        
        <div className="form-floating m-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={ (event) => {setPassword(event.target.value)}}  
        value = {password}/>
          <label for="floatingPassword">Password</label>
        </div>


        <div className="form-floating m-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="Password" onChange={ (event) => {setUsername(event.target.value)}} 
        value = {username}/>
          <label for="floatingPassword">Username</label>
        </div>
        
        <input className='button m-3' type = "submit" value = "Register" onClick={registerFunc}/>
        
        <Link to = "/Login">have an Account ?</Link>
        </form>
    
    </div>
  )
}
